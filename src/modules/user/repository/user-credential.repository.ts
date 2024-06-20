import { UserCredential } from 'src/domain/entity/user-credential.entity';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { FilterUserCredentialDto } from '../dto/filter-user-credential.dto';
import { UserCredentialType } from 'src/domain/constants/user-credential';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserCredentialRepository extends Repository<UserCredential> {
  constructor(private dataSource: DataSource) {
    super(UserCredential, dataSource.createEntityManager());
  }

  async getActivePassword(userUid: string): Promise<UserCredential> {
    return this.createQueryBuilder('user_credentials')
      .where('user_credentials.user_uid = :user_uid', { user_uid: userUid })
      .andWhere('user_credentials.type = :type', {
        type: UserCredentialType.PASSWORD,
      })
      .orderBy('user_credentials.id', 'DESC')
      .getOne();
  }

  filter(filter: FilterUserCredentialDto): SelectQueryBuilder<UserCredential> {
    const queryBuilder = this.createQueryBuilder('user_credentials');

    if (filter.uid) {
      queryBuilder.andWhere('user_credentials.uid = :uid', { uid: filter.uid });
    }

    if (filter.user_uid) {
      queryBuilder.andWhere('user_credentials.user_uid = :user_uid', {
        user_uid: filter.user_uid,
      });
    }

    if (filter.search) {
      const search = `%${filter.search.toLowerCase()}%`;
      queryBuilder.andWhere('LOWER(users.name) LIKE :search', { search });
    }

    return queryBuilder;
  }
}
