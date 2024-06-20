"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponse = void 0;
const common_1 = require("@nestjs/common");
function formatResponse(data, message, statusCode = common_1.HttpStatus.OK) {
    return {
        statusCode,
        message,
        data,
    };
}
exports.formatResponse = formatResponse;
//# sourceMappingURL=response-formatter.js.map