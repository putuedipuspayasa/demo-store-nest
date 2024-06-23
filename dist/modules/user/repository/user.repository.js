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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const user_entity_1 = require("../../../domain/entity/user.entity");
const typeorm_1 = require("typeorm");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(user_entity_1.User, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async fetchPaginate(req) {
        if (req.page === undefined || req.page <= 0) {
            req.page = 1;
        }
        if (req.limit === undefined || req.page <= 0) {
            req.limit = 10;
        }
        if (req.sortField === undefined) {
            req.sortField = 'id';
        }
        if (req.sortDirection === undefined) {
            req.sortDirection = 'DESC';
        }
        const queryBuilder = this.filter(req);
        queryBuilder.orderBy(`users.${req.sortField}`, req.sortDirection);
        const options = {
            limit: req.limit,
            page: req.page,
        };
        return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, options);
    }
    async getByFilter(filter) {
        return this.filter(filter).getOne();
    }
    async getByEmail(email) {
        return this.createQueryBuilder('users')
            .where('users.email = :email', { email })
            .getOne();
    }
    filter(filter) {
        const queryBuilder = this.createQueryBuilder('users');
        if (filter.id) {
            queryBuilder.andWhere('users.id = :id', { id: filter.id });
        }
        if (filter.uid) {
            queryBuilder.andWhere('users.uid = :uid', { uid: filter.uid });
        }
        if (filter.name) {
            queryBuilder.andWhere('users.name = :name', { name: filter.name });
        }
        if (filter.email) {
            queryBuilder.andWhere('LOWER(users.email) = :email', {
                email: filter.email,
            });
        }
        if (filter.search) {
            const search = `%${filter.search.toLowerCase()}%`;
            queryBuilder.andWhere('LOWER(users.name) LIKE :search', { search });
        }
        return queryBuilder;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], UserRepository);
//# sourceMappingURL=user.repository.js.map