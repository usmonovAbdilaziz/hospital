import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { handleError, successMessage } from 'src/helps/responce';
import { InjectModel } from '@nestjs/sequelize';
import { Patient } from './entities/patient.entity';
import { Hospital } from 'src/hospital/entities/hospital.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient) private readonly patientModel: typeof Patient,
    @InjectModel(Hospital) private readonly hospitalModel: typeof Hospital,
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    try {
      const {hospital_id,email}=createPatientDto
      const hospital = await this.hospitalModel.findByPk(hospital_id)
      if(!hospital){
        throw new NotFoundException('Hospital not found')
      }
      const patient = await this.patientModel.findOne({where:{email}})
      if(!patient){
        throw new ConflictException('Patient already exists')
      }
      const newPatient = await this.patientModel.create({...createPatientDto})
      return successMessage(newPatient,201)
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const patients = await this.patientModel.findAll({
        include: ['hospital', 'appoinment'],
        order: [['id', 'ASC']],
      });
      return successMessage(patients)
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const patient = await this.patientModel.findByPk(id, {
        include: ['hospital', 'appoinment'],
      });
      if(!patient){
        throw new NotFoundException('Patient not found')
      }
      return successMessage(patient)
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    try {
      const newPatient = await this.patientModel.update(updatePatientDto,{where:{id},returning:true})
      if(newPatient[0]===0){
        throw new NotFoundException('Patient not found ')
      }
      return successMessage(newPatient[1][0])
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const patient = await this.patientModel.destroy({where:{id}})
      if(patient===0){
        throw new NotFoundException('Patient not found')
      }
      return successMessage(['Deleted patient from ID'])
    } catch (error) {
      handleError(error);
    }
  }
}
