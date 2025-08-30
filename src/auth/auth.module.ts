import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Token } from 'src/utils/token-service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from './entities/auth.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Worker } from 'src/worker/entities/worker.entity';
import { CryuptoServise } from 'src/utils/hashed';
import { CryptoModule } from './crypto.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Auth, Patient, Worker]),
    CryptoModule,
    JwtModule.register({
      // <-- shu qism kerak
      secret: process.env.JWT_ACCESS_KEY,
      signOptions: { expiresIn: process.env.JWT_ACCESS_TIME },
    }),
    forwardRef(() => AdminModule), // circular dependency uchun
  ],
  controllers: [AuthController],
  providers: [AuthService, Token, CryuptoServise],
  exports: [Token], // Token providerini eksport qilamiz
})
export class AuthModule {}
