import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Worker } from './entities/worker.entity';
import { Hospital } from 'src/hospital/entities/hospital.entity';
import { handleError, successMessage } from 'src/helps/responce';
import { NotFoundError } from 'rxjs';

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker) private readonly workerModel: typeof Worker,
    @InjectModel(Hospital) private readonly hospitalModel: typeof Hospital,
  ) {}
  async create(createWorkerDto: CreateWorkerDto) {
    try {
      const {hospital_id,phone_number}=createWorkerDto
      const hospital = await this.hospitalModel.findByPk(hospital_id)
      if(!hospital){
        throw new NotFoundException('Hospital not found')
      }
      const worker =await this.workerModel.findOne({where:{phone_number}})
      if(worker){
        throw new ConflictException('This Phone number already exists')
      }
      const newWorker = await this.workerModel.create({...createWorkerDto})
      return successMessage(newWorker,201)
    } catch (error) {
    handleError(error)  
    }
  }

  async findAll() {
    try {
      const workers = await this.workerModel.findAll({
        include: ['hospital', 'appoinments'],
        order: [['id', 'ASC']],
      });
      return successMessage(workers)
    } catch (error) {
    handleError(error)  
    }
  }

  async findOne(id: number) {
    try {
      const worker = await this.workerModel.findByPk(id, {
        include: ['hospital', 'appoinments'],
      });
      if(!worker){
        throw new NotFoundException('Worker not found')
      }
      return successMessage(worker)
    } catch (error) {
    handleError(error)  
    }
  }

  async update(id: number, updateWorkerDto: UpdateWorkerDto) {
    try {
      const newWorker = await this.workerModel.update(updateWorkerDto,{where:{id},returning:true})
      if(newWorker[0]==0){
        throw new NotFoundException('Worker not found')
      }
      return successMessage(newWorker)
    } catch (error) {
    handleError(error)  
    }
  }

  async remove(id: number) {
    try {
      const worker = await this.workerModel.destroy({where:{id}})
      if(worker==0){
        throw new NotFoundException('Worker not found')
      }
      return successMessage(['Deleted worker from ID'])
    } catch (error) {
    handleError(error)  
    }
  }
}
