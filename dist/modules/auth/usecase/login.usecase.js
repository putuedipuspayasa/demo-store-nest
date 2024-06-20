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
exports.LoginUsecase = void 0;
const common_1 = require("@nestjs/common");
const user_credential_repository_1 = require("../../user/repository/user-credential.repository");
const user_repository_1 = require("../../user/repository/user.repository");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../../../infrastructure/jwt/jwt.config");
let LoginUsecase = class LoginUsecase {
    constructor(userRepository, userCredentialRepository, jwtService) {
        this.userRepository = userRepository;
        this.userCredentialRepository = userCredentialRepository;
        this.jwtService = jwtService;
    }
    async login(req) {
        const username = req.username.toLowerCase();
        const user = await this.userRepository.getByEmail(username);
        if (!user) {
            throw new Error('Invalid username or password');
        }
        const userPassword = await this.userCredentialRepository.getActivePassword(user.uid);
        if (!userPassword) {
            throw new Error('Invalid username or password');
        }
        const isPasswordValid = await bcrypt.compare(req.password, userPassword.value);
        if (!isPasswordValid) {
            throw new Error('Invalid username or password');
        }
        const accessToken = await this.jwtService.signAsync({
            uid: user.uid,
            username: user.email,
        });
        return {
            token: accessToken,
            type: jwt_config_1.JwtConfig.TOKEN_TYPE,
            expire: jwt_config_1.JwtConfig.EXPIRE_IN,
            user: user,
        };
    }
};
exports.LoginUsecase = LoginUsecase;
exports.LoginUsecase = LoginUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        user_credential_repository_1.UserCredentialRepository,
        jwt_1.JwtService])
], LoginUsecase);
//# sourceMappingURL=login.usecase.js.map