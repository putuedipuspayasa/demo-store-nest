"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User1718767128747 = void 0;
const typeorm_1 = require("typeorm");
class User1718767128747 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'uid',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                    isNullable: false,
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: null,
                    isNullable: true,
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    default: null,
                    isNullable: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'varchar',
                    isNullable: true,
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.User1718767128747 = User1718767128747;
//# sourceMappingURL=1718767128747-User.js.map