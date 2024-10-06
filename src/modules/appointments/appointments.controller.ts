import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('appointments')
@Controller('appointments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create appointment' })
  @ApiResponse({ status: 201, description: 'The appointment has been successfully created.' })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all appointments' })
  @ApiResponse({ status: 200, description: 'Return all appointments.' })
  findAll(@Query('date') date: string) {
    return this.appointmentsService.findAll(date);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an appointment' })
  @ApiResponse({ status: 200, description: 'Return an appointment.' })
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }
}