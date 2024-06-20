"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_credential_entity_1 = require("../../domain/entity/user-credential.entity");
const user_entity_1 = require("../../domain/entity/user.entity");
const file_system_storage_adapter_1 = require("../../infrastructure/utils/storage/file-system-storage.adapter");
const storage_service_1 = require("../../infrastructure/utils/storage/storage.service");
const user_controller_1 = require("./controller/user.controller");
const user_credential_repository_1 = require("./repository/user-credential.repository");
const user_repository_1 = require("./repository/user.repository");
const user_usecase_1 = require("./usecase/user.usecase");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, user_credential_entity_1.UserCredential])],
        controllers: [user_controller_1.UserController],
        providers: [
            user_repository_1.UserRepository,
            user_credential_repository_1.UserCredentialRepository,
            user_usecase_1.UserUsecase,
            {
                provide: storage_service_1.StorageService,
                useValue: new storage_service_1.StorageService(new file_system_storage_adapter_1.FileSystemStorageAdapter('userCounter.txt')),
            },
        ],
        exports: [user_usecase_1.UserUsecase],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map