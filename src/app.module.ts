import { Module } from '@nestjs/common';
import { S3FileMigrationCommand } from './Migration/MigrationCommand';
import { S3BucketClient } from './Proxy/S3BucletClient';
import { ConfigModule } from '@nestjs/config';
import { CommandService } from './services/command/command.service';
import { DataBaseService } from './services/data-base/data-base.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [S3FileMigrationCommand, S3BucketClient, CommandService, DataBaseService]
})
export class AppModule { }
