import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): { status: string; message: string } {
    return {
      status: 'ok',
      message: 'Service is healthy',
    };
  }
}
