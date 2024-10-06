import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { StylistsService } from '../stylists/stylists.service';
import { ServicesService } from '../services/services.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    private stylistsService: StylistsService,
    private servicesService: ServicesService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const stylist = await this.stylistsService.findOne(createAppointmentDto.stylistId);
    const service = await this.servicesService.findOne(createAppointmentDto.serviceId);

    if (!stylist || !service) {
      throw new BadRequestException('Invalid stylist or service');
    }

    const startTime = new Date(createAppointmentDto.startTime);
    const endTime = new Date(startTime.getTime() + service.durationMinutes * 60000);

    const appointment = this.appointmentsRepository.create({
      client: { id: createAppointmentDto.clientId },
      stylist,
      service,
      startTime,
      endTime,
    });

    return this.appointmentsRepository.save(appointment);
  }

  async findAll(date?: string): Promise<Appointment[]> {
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      return this.appointmentsRepository.find({
        where: {
          startTime: Between(startOfDay, endOfDay),
        },
        relations: ['client', 'stylist', 'service'],
      });
    }

    return this.appointmentsRepository.find({
      relations: ['client', 'stylist', 'service'],
    });
  }

  findOne(id: number): Promise<Appointment> {
    return this.appointmentsRepository.findOne({
      where: { id },
      relations: ['client', 'stylist', 'service'],
    });
  }
}