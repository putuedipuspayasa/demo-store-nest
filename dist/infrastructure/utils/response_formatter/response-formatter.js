"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponse = void 0;
const common_1 = require("@nestjs/common");
function formatResponse(res, data, message, code = common_1.HttpStatus.OK, errors = []) {
    const response = { code, message, data, errors };
    res.status(code).json(response);
    return response;
}
exports.formatResponse = formatResponse;
//# sourceMappingURL=response-formatter.js.map