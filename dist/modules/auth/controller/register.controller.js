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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = void 0;
const common_1 = require("@nestjs/common");
const register_usecase_1 = require("../usecase/register.usecase");
const register_dto_1 = require("../dto/register.dto");
const response_formatter_1 = require("../../../infrastructure/utils/response_formatter/response-formatter");
let RegisterController = class RegisterController {
    constructor(registerUsecase) {
        this.registerUsecase = registerUsecase;
    }
    async register(req) {
        try {
            const login = await this.registerUsecase.register(req);
            return (0, response_formatter_1.formatResponse)(login, 'Success');
        }
        catch (err) {
            throw (0, response_formatter_1.formatResponse)(null, err.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.RegisterController = RegisterController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], RegisterController.prototype, "register", null);
exports.RegisterController = RegisterController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [register_usecase_1.RegisterUsecase])
], RegisterController);
//# sourceMappingURL=register.controller.js.map