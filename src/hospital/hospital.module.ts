import { Module, forwardRef } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { HospitalController } from './hospital.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hospital } from './entities/hospital.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Hospital]),
    forwardRef(() => AuthModule), // Token providerini olish uchun
  ],
  controllers: [HospitalController],
  providers: [HospitalService],
})
export class HospitalModule {}
