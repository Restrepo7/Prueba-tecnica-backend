import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Asignatura } from '../../asignatura/entities/asignatura.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'] })
  dia: string;

  @Column({ type: 'time', name: 'hora_inicio' })
  horaInicio: string;

  @Column({ type: 'time', name: 'hora_fin' })
  horaFin: string;

  @Column({ length: 50, nullable: true })
  salon: string;

  @Column({ name: 'id_usuario' })
  idUsuario: number;

  @Column({ name: 'id_asignatura' })
  idAsignatura: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relación: muchos horarios pertenecen a un usuario
  @ManyToOne(() => Usuario, usuario => usuario.schedules)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  // Relación: muchos horarios pertenecen a una asignatura
  @ManyToOne(() => Asignatura, asignatura => asignatura.schedules)
  @JoinColumn({ name: 'id_asignatura' })
  asignatura: Asignatura;
}
