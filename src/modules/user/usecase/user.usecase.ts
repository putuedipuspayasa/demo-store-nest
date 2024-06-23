import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserCredentialType } from 'src/domain/constants/user-credential';
import { UserCredential } from 'src/domain/entity/user-credential.entity';
import { User } from 'src/domain/entity/user.entity';
import { JwtConfig } from 'src/infrastructure/jwt/jwt.config';
import { generateSerialNumberWithTime } from 'src/infrastructure/utils/serial_number/serial-number-generator';
import { StorageService } from 'src/infrastructure/utils/storage/storage.service';
import { DataSource } from 'typeorm';
import { ulid } from 'ulid';
import { CreateUserDto } from '../dto/create-user.dto';
import { FilterUserDto } from '../dto/filter-user.dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { UserCredentialRepository } from '../repository/user-credential.repository';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserUsecase {
  constructor(
    private userRepository: UserRepository,
    private userCredentialRepository: UserCredentialRepository,
    private dataSource: DataSource,
    private readonly storageService: StorageService,
  ) {}

  private get userCounter(): number {
    return this.storageService.getCounter();
  }

  private set userCounter(counter: number) {
    this.storageService.setCounter(counter);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const email = createUserDto.email.toLowerCase();
    const user = await this.userRepository.getByEmail(email);
    if (user) {
      throw new Error('Email already registered');
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        JwtConfig.SALT_ROUNDS,
      );

      const user = queryRunner.manager.create(User, {
        uid: generateSerialNumberWithTime('USR', ++this.userCounter),
        name: createUserDto.name,
        email: email,
        phone: createUserDto.phone,
        // password: hashedPassword,
      });
      const storeUser = await queryRunner.manager.save(user);

      const userCred = queryRunner.manager.create(UserCredential, {
        uid: ulid(),
        user_uid: storeUser.uid,
        type: UserCredentialType.PASSWORD,
        value: hashedPassword,
      });
      await queryRunner.manager.save(userCred);
      await queryRunner.commitTransaction();
      return storeUser;
    } catch (err: any) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  fetchAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  get(id: number): Promise<User> {
    return this.userRepository.findOneById(id);
  }

  fetchPaginate(req: FilterUserDto) {
    return this.userRepository.fetchPaginate(req);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.get(id);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
