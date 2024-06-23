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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
const typeorm_1 = require("typeorm");
const ulid_1 = require("ulid");
class BaseEntity {
    generateUlid() {
        if (!this.uid || this.uid.trim() === '') {
            this.uid = (0, ulid_1.ulid)();
        }
    }
}
exports.BaseEntity = BaseEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", Number)
], BaseEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], BaseEntity.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', nullable: true, default: null }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true, default: null }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], BaseEntity.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BaseEntity.prototype, "generateUlid", null);
//# sourceMappingURL=base.entity.js.map