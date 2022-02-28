import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Ao utilizar o Entity antes da class, está indicando que esse model toda vez que for salvo vai ser armazendo dentro da tabela de appointments
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;
