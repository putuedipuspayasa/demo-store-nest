import { UserCredential } from 'src/domain/entity/user-credential.entity';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { FilterUserCredentialDto } from '../dto/filter-user-credential.dto';
export declare class UserCredentialRepository extends Repository<UserCredential> {
    private dataSource;
    constructor(dataSource: DataSource);
    getActivePassword(userUid: string): Promise<UserCredential>;
    filter(filter: FilterUserCredentialDto): SelectQueryBuilder<UserCredential>;
}
