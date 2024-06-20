import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserCredentialType } from 'src/domain/constants/user-credential';
import { UserCredential } from 'src/domain/entity/user-credential.entity';
import { User } from 'src/domain/entity/user.entity';
import { JwtConfig } from 'src/infrastructure/jwt/jwt.config';
import { generateSerialNumberWithTime } from 'src/infrastructure/utils/serial_number/serial-number-generator';
import { StorageService } from 'src/infrastructure/utils/storage/storage.service';
import { UserCredentialRepository } from 'src/modules/user/repository/user-credential.repository';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { DataSource } from 'typeorm';
import { ulid } from 'ulid';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class RegisterUsecase {
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

  async register(req: RegisterDto): Promise<User> {
    const email = req.email.toLowerCase();

    const emailCheck = await this.userRepository.getByEmail(email);
    if (emailCheck) {
      throw new Error('Email already registered');
    }
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const hashedPassword = await bcrypt.hash(
        req.password,
        JwtConfig.SALT_ROUNDS,
      );

      const user = queryRunner.manager.create(User, {
        uid: generateSerialNumberWithTime('USR', ++this.userCounter),
        name: req.name,
        email: email,
        phone: req.phone,
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
}
