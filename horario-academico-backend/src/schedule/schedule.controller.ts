import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  // Crear horario - POST /schedules
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  // Obtener todos los horarios - GET /schedules
  @Get()
  findAll(@Query('idUsuario') idUsuario?: string) {
    // Si se proporciona idUsuario, obtener horarios de ese usuario
    if (idUsuario) {
      return this.scheduleService.findByUsuario(+idUsuario);
    }
    return this.scheduleService.findAll();
  }

  // Obtener horarios por usuario - GET /schedules/usuario/:idUsuario
  @Get('usuario/:idUsuario')
  findByUsuario(@Param('idUsuario') idUsuario: string) {
    return this.scheduleService.findByUsuario(+idUsuario);
  }

  // Obtener un horario - GET /schedules/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(+id);
  }

  // Actualizar horario - PATCH /schedules/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleService.update(+id, updateScheduleDto);
  }

  // Eliminar horario - DELETE /schedules/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }
}
