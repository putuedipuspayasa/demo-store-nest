import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserCredentialType } from 'src/domain/constants/user-credential';
import { Company } from 'src/domain/entity/company.entity';
import { UserCredential } from 'src/domain/entity/user-credential.entity';
import { User } from 'src/domain/entity/user.entity';
import { JwtConfig } from 'src/infrastructure/jwt/jwt.config';
import { StorageService } from 'src/infrastructure/utils/storage/storage.service';
import { CompanyRepository } from 'src/modules/company/repository/company.repository';
import { UserCredentialRepository } from 'src/modules/user/repository/user-credential.repository';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { DataSource } from 'typeorm';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class RegisterUsecase {
  constructor(
    private userRepository: UserRepository,
    private userCredentialRepository: UserCredentialRepository,
    private dataSource: DataSource,
    private readonly storageService: StorageService,
    private companyRepository: CompanyRepository,
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

      // const userCode = generateSerialNumberWithTime('USR', ++this.userCounter);
      const user = queryRunner.manager.create(User, {
        name: req.name,
        username: email,
        email: email,
        phone: req.phone,
      });

      if (req.create_company) {
        const company = await queryRunner.manager.create(Company, {
          name: req.name,
        });

        const storeCompany = await queryRunner.manager.save(company);

        user.company_uid = storeCompany.uid;
      }

      const storeUser = await queryRunner.manager.save(user);

      const userCred = queryRunner.manager.create(UserCredential, {
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
