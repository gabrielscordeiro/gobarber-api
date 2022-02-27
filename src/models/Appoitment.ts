import { v4 as uuidv4 } from 'uuid';

class Appointment {
  id: string;

  provider: string;

  date: Date;

  // Omit pega todos os tipos(variáveis) dentro do objeto e remove um item
  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuidv4();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
