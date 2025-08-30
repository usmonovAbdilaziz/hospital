import { Module, forwardRef } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './entities/admin.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin]),
    forwardRef(() => AuthModule), // Token providerini olish uchun
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
