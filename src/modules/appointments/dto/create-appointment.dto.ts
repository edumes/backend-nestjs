import { IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsNumber()
  clientId: number;

  @ApiProperty()
  @IsNumber()
  stylistId: number;

  @ApiProperty()
  @IsNumber()
  serviceId: number;

  @ApiProperty()
  @IsDateString()
  startTime: string;
}