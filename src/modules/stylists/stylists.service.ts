import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stylist } from './entities/stylist.entity';
import { CreateStylistDto } from './dto/create-stylist.dto';

@Injectable()
export class StylistsService {
  constructor(
    @InjectRepository(Stylist)
    private stylistsRepository: Repository<Stylist>,
  ) {}

  create(createStylistDto: CreateStylistDto): Promise<Stylist> {
    const stylist = this.stylistsRepository.create(createStylistDto);
    return this.stylistsRepository.save(stylist);
  }

  findAll(): Promise<Stylist[]> {
    return this.stylistsRepository.find({ relations: ['services'] });
  }

  findOne(id: number): Promise<Stylist> {
    return this.stylistsRepository.findOne({
      where: { id },
      relations: ['services'],
    });
  }
}