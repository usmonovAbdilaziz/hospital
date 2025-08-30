import { Module, forwardRef } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patient } from './entities/patient.entity';
import { Hospital } from 'src/hospital/entities/hospital.entity';
import { HospitalModule } from '../hospital/hospital.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Patient, Hospital]),
    HospitalModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})

export class PatientModule {}
