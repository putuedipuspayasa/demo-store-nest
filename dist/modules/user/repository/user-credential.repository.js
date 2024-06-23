"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCredentialRepository = void 0;
const common_1 = require("@nestjs/common");
const user_credential_1 = require("../../../domain/constants/user-credential");
const user_credential_entity_1 = require("../../../domain/entity/user-credential.entity");
const typeorm_1 = require("typeorm");
let UserCredentialRepository = class UserCredentialRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(user_credential_entity_1.UserCredential, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async getActivePassword(userUid) {
        return this.createQueryBuilder('user_credentials')
            .where('user_credentials.user_uid = :user_uid', { user_uid: userUid })
            .andWhere('user_credentials.type = :type', {
            type: user_credential_1.UserCredentialType.PASSWORD,
        })
            .orderBy('user_credentials.id', 'DESC')
            .getOne();
    }
    filter(filter) {
        const queryBuilder = this.createQueryBuilder('user_credentials');
        if (filter.id) {
            queryBuilder.andWhere('user_credentials.id = :id', { id: filter.id });
        }
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
};
exports.UserCredentialRepository = UserCredentialRepository;
exports.UserCredentialRepository = UserCredentialRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], UserCredentialRepository);
//# sourceMappingURL=user-credential.repository.js.map