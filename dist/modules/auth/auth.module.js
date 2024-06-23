"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const company_entity_1 = require("../../domain/entity/company.entity");
const user_credential_entity_1 = require("../../domain/entity/user-credential.entity");
const user_entity_1 = require("../../domain/entity/user.entity");
const jwt_config_1 = require("../../infrastructure/jwt/jwt.config");
const file_system_storage_adapter_1 = require("../../infrastructure/utils/storage/file-system-storage.adapter");
const storage_service_1 = require("../../infrastructure/utils/storage/storage.service");
const company_repository_1 = require("../company/repository/company.repository");
const user_credential_repository_1 = require("../user/repository/user-credential.repository");
const user_repository_1 = require("../user/repository/user.repository");
const login_controller_1 = require("./controller/login.controller");
const register_controller_1 = require("./controller/register.controller");
const login_usecase_1 = require("./usecase/login.usecase");
const register_usecase_1 = require("./usecase/register.usecase");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, user_credential_entity_1.UserCredential, company_entity_1.Company]),
            jwt_1.JwtModule.register({
                global: true,
                secret: jwt_config_1.JwtConfig.SECRET_KEY,
                signOptions: { expiresIn: `${jwt_config_1.JwtConfig.EXPIRE_IN}s` },
            }),
        ],
        controllers: [login_controller_1.LoginController, register_controller_1.RegisterController],
        providers: [
            user_repository_1.UserRepository,
            user_credential_repository_1.UserCredentialRepository,
            company_repository_1.CompanyRepository,
            login_usecase_1.LoginUsecase,
            register_usecase_1.RegisterUsecase,
            {
                provide: storage_service_1.StorageService,
                useValue: new storage_service_1.StorageService(new file_system_storage_adapter_1.FileSystemStorageAdapter('userCounter.txt')),
            },
        ],
        exports: [login_usecase_1.LoginUsecase, register_usecase_1.RegisterUsecase],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map