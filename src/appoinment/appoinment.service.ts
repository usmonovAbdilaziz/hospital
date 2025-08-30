import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppoinmentDto } from './dto/create-appoinment.dto';
import { UpdateAppoinmentDto } from './dto/update-appoinment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Appoinment } from './entities/appoinment.entity';
import { Hospital } from 'src/hospital/entities/hospital.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Worker } from 'src/worker/entities/worker.entity';
import { handleError, successMessage } from 'src/helps/responce';
import { throwError } from 'rxjs';

@Injectable()
export class AppoinmentService {
  constructor(
    @InjectModel(Appoinment)
    private readonly appoinmentModel: typeof Appoinment,
    @InjectModel(Hospital) private readonly hospitalModel: typeof Hospital,
    @InjectModel(Patient) private readonly patientModel: typeof Patient,
    @InjectModel(Worker) private readonly workerModel: typeof Worker,
  ) {}
  async create(createAppoinmentDto: CreateAppoinmentDto) {
    try {
      const { hospital_id, patient_id, worker_id, schedule_start } =
        createAppoinmentDto;
      const hospital = await this.hospitalModel.findByPk(hospital_id);
      if (!hospital) throw new NotFoundException('Hospital not found');
      const patient = await this.patientModel.findByPk(patient_id);
      if (!patient) throw new NotFoundException('Hospital not found');
      const worker = await this.workerModel.findByPk(worker_id);
      if (!worker) throw new NotFoundException('Hospital not found');
      if (worker.workerRole === 'doctor') {
        const date = await this.appoinmentModel.findOne({
          where: { schedule_start },
        });
        if (date) {
          throw new ConflictException('This times doctor is busy');
        }
      }
      const newAppoinment = await this.appoinmentModel.create({
        ...createAppoinmentDto,
      });
      return successMessage(newAppoinment, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const appoinments = await this.appoinmentModel.findAll({
        include: ['hospital', 'patient', 'worker'],
        order: [['id', 'ASC']],
      });
      return successMessage(appoinments);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const appoinment = await this.appoinmentModel.findByPk(id, {
        include: ['hospital', 'patient', 'worker'],
        order: [['id', 'ASC']],
      });
      if (!appoinment) {
        throw new NotFoundException('Appoinmetn not found');
      }
      return successMessage(appoinment);
    } catch (error) {
      handleError(error);
    }
  }

   async update(id: number, updateAppoinmentDto: UpdateAppoinmentDto) {
   try {
     const appoinment = await this.appoinmentModel.update(updateAppoinmentDto,{where:{id}})
    if(appoinment[0]===0){
      throw new NotFoundException('Appoinment not found ')
    }
    return successMessage(appoinment)
   } catch (error) {
    handleError(error)
   }
  }

  async remove(id: number) {
    try {
      const appoinment = await this.appoinmentModel.destroy({where:{id}})
      if(appoinment==0){
        throw new NotFoundException('Appoinment not found')
      }
      return successMessage(['Deleted appoinment from ID'])
    } catch (error) {
      handleError(error)
    }
  }
}
