import { Module } from '@nestjs/common';
import { AppController } from './AppController';
import { AppService } from './AppService';
import { ConfigModule } from './config/ConfigModule';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
