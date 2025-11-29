import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AsignaturaService } from './asignatura.service';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto';

@Controller('asignaturas')
export class AsignaturaController {
  constructor(private readonly asignaturaService: AsignaturaService) {}

  // Crear asignatura - POST /asignaturas
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAsignaturaDto: CreateAsignaturaDto) {
    return this.asignaturaService.create(createAsignaturaDto);
  }

  // Obtener todas las asignaturas - GET /asignaturas
  @Get()
  findAll() {
    return this.asignaturaService.findAll();
  }

  // Obtener una asignatura - GET /asignaturas/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asignaturaService.findOne(+id);
  }

  // Actualizar asignatura - PATCH /asignaturas/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsignaturaDto: UpdateAsignaturaDto) {
    return this.asignaturaService.update(+id, updateAsignaturaDto);
  }

  // Eliminar asignatura - DELETE /asignaturas/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.asignaturaService.remove(+id);
  }
}
