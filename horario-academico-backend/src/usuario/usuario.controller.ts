import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Public } from '../auth/decorators/public.decorator';

@Controller('usuarios')
@UseGuards(RolesGuard) // Aplicar guard de roles
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // Crear usuario (solo admin) - POST /usuarios
  @Post()
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  // Obtener todos los usuarios (admin y profesor) - GET /usuarios
  @Get()
  @Roles('admin', 'profesor')
  findAll() {
    return this.usuarioService.findAll();
  }

  // Obtener un usuario - GET /usuarios/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  // Actualizar usuario - PATCH /usuarios/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  // Eliminar usuario (solo admin) - DELETE /usuarios/:id
  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
