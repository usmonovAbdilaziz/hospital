import { Module, forwardRef } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Worker } from './entities/worker.entity';
import { Hospital } from 'src/hospital/entities/hospital.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[
    SequelizeModule.forFeature([Worker,Hospital]),
    forwardRef(() => AuthModule), // Token providerini olish uchun
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
