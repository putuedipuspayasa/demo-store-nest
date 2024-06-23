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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const common_1 = require("@nestjs/common");
const express_1 = require("express");
const response_formatter_1 = require("../../../infrastructure/utils/response_formatter/response-formatter");
const login_dto_1 = require("../dto/login.dto");
const login_usecase_1 = require("../usecase/login.usecase");
let LoginController = class LoginController {
    constructor(loginUsecase) {
        this.loginUsecase = loginUsecase;
    }
    async login(loginDto, res) {
        try {
            const login = await this.loginUsecase.login(loginDto);
            return (0, response_formatter_1.formatResponse)(res, login, 'Success');
        }
        catch (err) {
            return (0, response_formatter_1.formatResponse)(res, null, err.message, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
exports.LoginController = LoginController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "login", null);
exports.LoginController = LoginController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [login_usecase_1.LoginUsecase])
], LoginController);
//# sourceMappingURL=login.controller.js.map