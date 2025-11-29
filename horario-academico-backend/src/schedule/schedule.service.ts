import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  // Crear un nuevo horario
  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    try {
      // Validar que hora_fin sea mayor que hora_inicio
      if (createScheduleDto.horaInicio >= createScheduleDto.horaFin) {
        throw new BadRequestException('La hora de fin debe ser posterior a la hora de inicio');
      }

      // Verificar que la asignatura no exceda el máximo de clases por semana
      const clasesActuales = await this.scheduleRepository.count({
        where: { idAsignatura: createScheduleDto.idAsignatura },
      });

      // Aquí deberías obtener el maxClasesSemana de la asignatura
      // Para simplificar, asumimos un límite genérico
      if (clasesActuales >= 6) {
        throw new BadRequestException('La asignatura ha alcanzado el máximo de clases por semana');
      }

      const schedule = this.scheduleRepository.create(createScheduleDto);
      return await this.scheduleRepository.save(schedule);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error al crear el horario');
    }
  }

  // Obtener todos los horarios
  async findAll(): Promise<Schedule[]> {
    return await this.scheduleRepository.find({
      relations: ['usuario', 'asignatura'],
    });
  }

  // Obtener un horario por ID
  async findOne(id: number): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id },
      relations: ['usuario', 'asignatura'],
    });

    if (!schedule) {
      throw new NotFoundException(`Horario con ID ${id} no encontrado`);
    }

    return schedule;
  }

  // Obtener horarios por usuario
  async findByUsuario(idUsuario: number): Promise<Schedule[]> {
    return await this.scheduleRepository.find({
      where: { idUsuario },
      relations: ['asignatura'],
      order: {
        dia: 'ASC',
        horaInicio: 'ASC',
      },
    });
  }

  // Actualizar un horario
  async update(id: number, updateScheduleDto: UpdateScheduleDto): Promise<Schedule> {
    await this.findOne(id);

    // Validar horas si se están actualizando
    if (updateScheduleDto.horaInicio && updateScheduleDto.horaFin) {
      if (updateScheduleDto.horaInicio >= updateScheduleDto.horaFin) {
        throw new BadRequestException('La hora de fin debe ser posterior a la hora de inicio');
      }
    }

    await this.scheduleRepository.update(id, updateScheduleDto);
    return this.findOne(id);
  }

  // Eliminar un horario
  async remove(id: number): Promise<void> {
    const schedule = await this.findOne(id);
    await this.scheduleRepository.remove(schedule);
  }
}
