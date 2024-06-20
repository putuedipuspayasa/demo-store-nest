"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCredential1718767646069 = void 0;
const typeorm_1 = require("typeorm");
class UserCredential1718767646069 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user_credentials',
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
                    name: 'user_uid',
                    type: 'varchar',
                },
                {
                    name: 'type',
                    type: 'varchar',
                },
                {
                    name: 'value',
                    type: 'varchar',
                    isNullable: true,
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('user_credentials');
    }
}
exports.UserCredential1718767646069 = UserCredential1718767646069;
//# sourceMappingURL=1718767646069-UserCredential.js.map