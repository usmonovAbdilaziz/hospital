import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Hospital } from './entities/hospital.entity';
import { handleError, successMessage } from 'src/helps/responce';

@Injectable()
export class HospitalService {
  constructor(
    @InjectModel(Hospital) private readonly hospitalModel: typeof Hospital,
  ) {}
  async create(createHospitalDto: CreateHospitalDto) {
    try {
      const {hospital_name,phone_number}=createHospitalDto
      const hospital=await this.hospitalModel.findOne({where:{hospital_name}})
      if(hospital){
        throw new ConflictException('Hospital already exists')
      }
      const phone = await this.hospitalModel.findOne({
        where: { phone_number },
      });
      if (phone) {
        throw new ConflictException('Hospital already exists');
      }
      const newHospital = await this.hospitalModel.create({...createHospitalDto})
      return successMessage(newHospital,201)
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const hospitals = await this.hospitalModel.findAll({order:[['id','ASC']],include:['patients','workers']})
      return successMessage(hospitals)
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const hospital = await this.hospitalModel.findByPk(id,{include:['patient','worker']})
      if(!hospital){
        throw new NotFoundException('Hospital not found')
      }
    return successMessage(hospital)
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateHospitalDto: UpdateHospitalDto) {
    try {
      const newwHospital = await this.hospitalModel.update(updateHospitalDto,{where:{id},returning:true})
      if(newwHospital[0]===0){
        throw new NotFoundException('Hospital not found')
      }
      return successMessage(newwHospital[1][0])
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const hospital = await this.hospitalModel.destroy({where:{id}})
      if(hospital===0){
        throw new NotFoundException('Hospital not found')
      }
      return successMessage(['Hospital delete from ID'])
    } catch (error) {
      handleError(error);
    }
  }
}
