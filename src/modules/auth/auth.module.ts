import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCredential } from 'src/domain/entity/user-credential.entity';
import { User } from 'src/domain/entity/user.entity';
import { JwtConfig } from 'src/infrastructure/jwt/jwt.config';
import { FileSystemStorageAdapter } from 'src/infrastructure/utils/storage/file-system-storage.adapter';
import { StorageService } from 'src/infrastructure/utils/storage/storage.service';
import { UserCredentialRepository } from '../user/repository/user-credential.repository';
import { UserRepository } from '../user/repository/user.repository';
import { LoginController } from './controller/login.controller';
import { RegisterController } from './controller/register.controller';
import { LoginUsecase } from './usecase/login.usecase';
import { RegisterUsecase } from './usecase/register.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserCredential]),
    JwtModule.register({
      global: true,
      secret: JwtConfig.SECRET_KEY,
      signOptions: { expiresIn: `${JwtConfig.EXPIRE_IN}s` },
    }),
  ],
  controllers: [LoginController, RegisterController],
  providers: [
    UserRepository,
    UserCredentialRepository,
    LoginUsecase,
    RegisterUsecase,
    {
      provide: StorageService,
      useValue: new StorageService(
        new FileSystemStorageAdapter('userCounter.txt'),
      ),
    },
  ],
  exports: [LoginUsecase, RegisterUsecase],
})
export class AuthModule {}
