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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const response_formatter_1 = require("../../../infrastructure/utils/response_formatter/response-formatter");
const create_user_dto_1 = require("../dto/create-user.dto");
const filter_user_dto_1 = require("../dto/filter-user.dto");
const user_usecase_1 = require("../usecase/user.usecase");
let UserController = class UserController {
    constructor(userUsecase) {
        this.userUsecase = userUsecase;
    }
    async create(createUserDto, res) {
        const user = await this.userUsecase.create(createUserDto);
        return (0, response_formatter_1.formatResponse)(res, user, 'Success');
    }
    async fetchAll(res) {
        const users = await this.userUsecase.fetchAll();
        return (0, response_formatter_1.formatResponse)(res, users, 'Success');
    }
    async fetchPaginate(req, res) {
        const users = await this.userUsecase.fetchPaginate(req);
        return (0, response_formatter_1.formatResponse)(res, users, 'Success');
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "fetchAll", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_user_dto_1.FilterUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "fetchPaginate", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_usecase_1.UserUsecase])
], UserController);
//# sourceMappingURL=user.controller.js.map