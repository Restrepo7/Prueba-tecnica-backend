import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignatura } from './entities/asignatura.entity';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto';

@Injectable()
export class AsignaturaService {
  constructor(
    @InjectRepository(Asignatura)
    private asignaturaRepository: Repository<Asignatura>,
  ) {}

  // Crear una nueva asignatura
  async create(createAsignaturaDto: CreateAsignaturaDto): Promise<Asignatura> {
    try {
      // Verificar si el código ya existe
      const existeCodigo = await this.asignaturaRepository.findOne({
        where: { codigo: createAsignaturaDto.codigo },
      });

      if (existeCodigo) {
        throw new ConflictException('El código de asignatura ya existe');
      }

      const asignatura = this.asignaturaRepository.create(createAsignaturaDto);
      return await this.asignaturaRepository.save(asignatura);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Error al crear la asignatura');
    }
  }

  // Obtener todas las asignaturas
  async findAll(): Promise<Asignatura[]> {
    return await this.asignaturaRepository.find();
  }

  // Obtener una asignatura por ID
  async findOne(id: number): Promise<Asignatura> {
    const asignatura = await this.asignaturaRepository.findOne({
      where: { id },
    });

    if (!asignatura) {
      throw new NotFoundException(`Asignatura con ID ${id} no encontrada`);
    }

    return asignatura;
  }

  // Actualizar una asignatura
  async update(id: number, updateAsignaturaDto: UpdateAsignaturaDto): Promise<Asignatura> {
    const asignatura = await this.findOne(id);

    // Si se está actualizando el código, verificar que no exista
    if (updateAsignaturaDto.codigo && updateAsignaturaDto.codigo !== asignatura.codigo) {
      const existeCodigo = await this.asignaturaRepository.findOne({
        where: { codigo: updateAsignaturaDto.codigo },
      });

      if (existeCodigo) {
        throw new ConflictException('El código de asignatura ya existe');
      }
    }

    await this.asignaturaRepository.update(id, updateAsignaturaDto);
    return this.findOne(id);
  }

  // Eliminar una asignatura
  async remove(id: number): Promise<void> {
    const asignatura = await this.findOne(id);
    await this.asignaturaRepository.remove(asignatura);
  }
}
