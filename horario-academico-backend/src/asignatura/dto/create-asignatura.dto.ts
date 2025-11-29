import { IsNotEmpty, IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

export class CreateAsignaturaDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString()
  nombre: string;

  @IsNotEmpty({ message: 'El código es requerido' })
  @IsString()
  codigo: string;

  @IsNotEmpty({ message: 'Los créditos son requeridos' })
  @IsInt()
  @Min(1)
  creditos: number;

  @IsNotEmpty({ message: 'El máximo de clases por semana es requerido' })
  @IsInt()
  @Min(1)
  @Max(6)
  maxClasesSemana: number;

  @IsOptional()
  @IsString()
  descripcion?: string;
}