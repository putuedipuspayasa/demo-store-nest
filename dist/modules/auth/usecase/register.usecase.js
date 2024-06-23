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
exports.RegisterUsecase = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const user_credential_1 = require("../../../domain/constants/user-credential");
const company_entity_1 = require("../../../domain/entity/company.entity");
const user_credential_entity_1 = require("../../../domain/entity/user-credential.entity");
const user_entity_1 = require("../../../domain/entity/user.entity");
const jwt_config_1 = require("../../../infrastructure/jwt/jwt.config");
const storage_service_1 = require("../../../infrastructure/utils/storage/storage.service");
const company_repository_1 = require("../../company/repository/company.repository");
const user_credential_repository_1 = require("../../user/repository/user-credential.repository");
const user_repository_1 = require("../../user/repository/user.repository");
const typeorm_1 = require("typeorm");
let RegisterUsecase = class RegisterUsecase {
    constructor(userRepository, userCredentialRepository, dataSource, storageService, companyRepository) {
        this.userRepository = userRepository;
        this.userCredentialRepository = userCredentialRepository;
        this.dataSource = dataSource;
        this.storageService = storageService;
        this.companyRepository = companyRepository;
    }
    get userCounter() {
        return this.storageService.getCounter();
    }
    set userCounter(counter) {
        this.storageService.setCounter(counter);
    }
    async register(req) {
        const email = req.email.toLowerCase();
        const emailCheck = await this.userRepository.getByEmail(email);
        if (emailCheck) {
            throw new Error('Email already registered');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const hashedPassword = await bcrypt.hash(req.password, jwt_config_1.JwtConfig.SALT_ROUNDS);
            const user = queryRunner.manager.create(user_entity_1.User, {
                name: req.name,
                username: email,
                email: email,
                phone: req.phone,
            });
            if (req.create_company) {
                const company = await queryRunner.manager.create(company_entity_1.Company, {
                    name: req.name,
                });
                const storeCompany = await queryRunner.manager.save(company);
                user.company_uid = storeCompany.uid;
            }
            const storeUser = await queryRunner.manager.save(user);
            const userCred = queryRunner.manager.create(user_credential_entity_1.UserCredential, {
                user_uid: storeUser.uid,
                type: user_credential_1.UserCredentialType.PASSWORD,
                value: hashedPassword,
            });
            await queryRunner.manager.save(userCred);
            await queryRunner.commitTransaction();
            return storeUser;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw new Error(err);
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.RegisterUsecase = RegisterUsecase;
exports.RegisterUsecase = RegisterUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        user_credential_repository_1.UserCredentialRepository, typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object, storage_service_1.StorageService,
        company_repository_1.CompanyRepository])
], RegisterUsecase);
//# sourceMappingURL=register.usecase.js.map