import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Schedule } from '../../schedule/entities/schedule.entity';

@Entity('asignatura')
export class Asignatura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 20, unique: true })
  codigo: string;

  @Column()
  creditos: number;

  @Column({ name: 'max_clases_semana', default: 3 })
  maxClasesSemana: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relación: una asignatura puede estar en muchos horarios
  @OneToMany(() => Schedule, schedule => schedule.asignatura)
  schedules: Schedule[];
}