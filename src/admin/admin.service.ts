import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { InjectModel } from '@nestjs/sequelize';
import { handleError, successMessage } from 'src/helps/responce';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private readonly adminModel: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto) {
    try {
      const {phone_number,username}=createAdminDto
      const phone = await this.adminModel.findOne({where:{phone_number}})
      if(phone){
        throw new ConflictException('Admin already exists')
      }
      const user = await this.adminModel.findOne({ where: { username } });
      if (user) {
        throw new ConflictException('Admin already exists');
      }
      const admin =await this.adminModel.create({...createAdminDto})
      return successMessage(admin,201)
    } catch (error) {
      handleError(error)
    }

  }

  async findAll() {
    try {
      const admins = await this.adminModel.findAll({order:[['id','ASC']]})
      return successMessage(admins)
    } catch (error) {
      handleError(error)
    }
  }

  async findOne(id: number) {
    try {
      const admin = await this.adminModel.findByPk(id)
      if(!admin){
        throw new NotFoundException('Admin not found')
      }
      return successMessage(admin)
    } catch (error) {
      handleError(error)
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      const newAdmin = await this.adminModel.update(updateAdminDto,{where:{id},returning:true})
      if(newAdmin[0]===0){
        throw new NotFoundException('Admin not found')
      }
      return successMessage(newAdmin[1][0])
    } catch (error) {
      handleError(error)
    }
  }

  async remove(id: number) {
    try {
      const admin = await this.adminModel.destroy({where:{id}})
      if(admin===0){
        throw new NotFoundException('Admin not found')
      }
      return successMessage(['Deleted admin from ID'])
    } catch (error) {
      handleError(error)
    }
  }
}
