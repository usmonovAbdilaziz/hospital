import { Module } from '@nestjs/common';
import { AppoinmentService } from './appoinment.service';
import { AppoinmentController } from './appoinment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Appoinment } from './entities/appoinment.entity';
import { Worker } from 'src/worker/entities/worker.entity';
import { Hospital } from 'src/hospital/entities/hospital.entity';
import { Patient } from 'src/patient/entities/patient.entity';

@Module({
  imports:[SequelizeModule.forFeature([Appoinment,Worker,Hospital,Patient])],
  controllers: [AppoinmentController],
  providers: [AppoinmentService],
})
export class AppoinmentModule {}
