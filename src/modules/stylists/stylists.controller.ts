import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { StylistsService } from './stylists.service';
import { CreateStylistDto } from './dto/create-stylist.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('stylists')
@Controller('stylists')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class StylistsController {
  constructor(private readonly stylistsService: StylistsService) {}

  @Post()
  @ApiOperation({ summary: 'Create stylist' })
  @ApiResponse({ status: 201, description: 'The stylist has been successfully created.' })
  create(@Body() createStylistDto: CreateStylistDto) {
    return this.stylistsService.create(createStylistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stylists' })
  @ApiResponse({ status: 200, description: 'Return all stylists.' })
  findAll() {
    return this.stylistsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a stylist' })
  @ApiResponse({ status: 200, description: 'Return a stylist.' })
  findOne(@Param('id') id: string) {
    return this.stylistsService.findOne(+id);
  }
}