import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCredential } from 'src/domain/entity/user-credential.entity';
import { User } from 'src/domain/entity/user.entity';
import { FileSystemStorageAdapter } from 'src/infrastructure/utils/storage/file-system-storage.adapter';
import { StorageService } from 'src/infrastructure/utils/storage/storage.service';
import { UserController } from './controller/user.controller';
import { UserCredentialRepository } from './repository/user-credential.repository';
import { UserRepository } from './repository/user.repository';
import { UserUsecase } from './usecase/user.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserCredential])],
  controllers: [UserController],
  providers: [
    UserRepository,
    UserCredentialRepository,
    UserUsecase,
    {
      provide: StorageService,
      useValue: new StorageService(
        new FileSystemStorageAdapter('userCounter.txt'),
      ),
    },
  ],
  exports: [UserUsecase],
})
export class UserModule {}
