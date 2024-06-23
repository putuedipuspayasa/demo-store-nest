"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: false,
        forbidNonWhitelisted: true,
        exceptionFactory: (errors) => {
            const firstError = errors
                .map((error) => Object.values(error.constraints))
                .flat()[0];
            const transformedError = firstError.replace(/_/g, ' ');
            return new common_1.HttpException({
                status_code: common_1.HttpStatus.BAD_REQUEST,
                message: `Validation failed. ${transformedError}`,
                errors: errors
                    .map((error) => Object.values(error.constraints))
                    .flat(),
            }, common_1.HttpStatus.BAD_REQUEST);
        },
    }));
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map