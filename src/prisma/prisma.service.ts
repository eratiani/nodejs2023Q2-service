import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private maxRetries = 10;
  private retryInterval = 3000; // 3 seconds

  async onModuleInit() {
    await this.connectWithRetry();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private async connectWithRetry() {
    let retries = 0;
    while (retries < this.maxRetries) {
      try {
        await this.$connect();
        console.log('Connected to the database');
        break;
      } catch (error) {
        console.error('Failed to connect to the database:', error.message);
        retries++;
        await new Promise((resolve) => setTimeout(resolve, this.retryInterval));
      }
    }

    if (retries === this.maxRetries) {
      console.error('Max retries reached. Could not connect to the database.');
      process.exit(1);
    }
  }
}
