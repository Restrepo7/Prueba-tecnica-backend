import { IsEnum, IsNotEmpty, IsInt, IsString, Matches, IsOptional } from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty({ message: 'El día es requerido' })
  @IsEnum(['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'], { message: 'Día inválido' })
  dia: string;

  @IsNotEmpty({ message: 'La hora de inicio es requerida' })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, { message: 'Formato de hora inválido (HH:MM)' })
  horaInicio: string;

  @IsNotEmpty({ message: 'La hora de fin es requerida' })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, { message: 'Formato de hora inválido (HH:MM)' })
  horaFin: string;

  @IsNotEmpty({ message: 'El ID del usuario es requerido' })
  @IsInt()
  idUsuario: number;

  @IsNotEmpty({ message: 'El ID de la asignatura es requerido' })
  @IsInt()
  idAsignatura: number;

  @IsOptional()
  @IsString()
  salon?: string;
}
