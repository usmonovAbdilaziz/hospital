import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin/entities/admin.entity';
import { HospitalModule } from './hospital/hospital.module';
import { Hospital } from './hospital/entities/hospital.entity';
import { PatientModule } from './patient/patient.module';
import { Patient } from './patient/entities/patient.entity';
import { WorkerModule } from './worker/worker.module';
import { Worker } from './worker/entities/worker.entity';
import { AppoinmentModule } from './appoinment/appoinment.module';
import { Appoinment } from './appoinment/entities/appoinment.entity';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entities/auth.entity';
import { Token } from './utils/token-service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: String(process.env.DB_HOST),
      port: Number(process.env.DB_PORT),
      username: String(process.env.DB_USER),
      password: String(process.env.DB_PASSWORD),
      database: String(process.env.DB_DATABASE),
      autoLoadModels: true,
      synchronize: true,
      logging: false,
      models: [Admin, Hospital, Patient, Worker, Appoinment, Auth],
    }),
    AdminModule,
    HospitalModule,
    PatientModule,
    WorkerModule,
    AppoinmentModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [Token],
  exports: [Token], // Token servisini boshqa modullarga eksport qilamiz
})
export class AppModule {}
