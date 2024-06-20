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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUsecase = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const user_credential_1 = require("../../../domain/constants/user-credential");
const user_credential_entity_1 = require("../../../domain/entity/user-credential.entity");
const user_entity_1 = require("../../../domain/entity/user.entity");
const jwt_config_1 = require("../../../infrastructure/jwt/jwt.config");
const serial_number_generator_1 = require("../../../infrastructure/utils/serial_number/serial-number-generator");
const storage_service_1 = require("../../../infrastructure/utils/storage/storage.service");
const user_credential_repository_1 = require("../../user/repository/user-credential.repository");
const user_repository_1 = require("../../user/repository/user.repository");
const typeorm_1 = require("typeorm");
const ulid_1 = require("ulid");
let RegisterUsecase = class RegisterUsecase {
    constructor(userRepository, userCredentialRepository, dataSource, storageService) {
        this.userRepository = userRepository;
        this.userCredentialRepository = userCredentialRepository;
        this.dataSource = dataSource;
        this.storageService = storageService;
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
                uid: (0, serial_number_generator_1.generateSerialNumberWithTime)('USR', ++this.userCounter),
                name: req.name,
                email: email,
                phone: req.phone,
            });
            const storeUser = await queryRunner.manager.save(user);
            const userCred = queryRunner.manager.create(user_credential_entity_1.UserCredential, {
                uid: (0, ulid_1.ulid)(),
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
        user_credential_repository_1.UserCredentialRepository,
        typeorm_1.DataSource,
        storage_service_1.StorageService])
], RegisterUsecase);
//# sourceMappingURL=register.usecase.js.map