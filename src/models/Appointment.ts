import { uuid } from 'uuidv4'
 
class Appointment {
    id: string;

    name: string;

    date: Date;

    constructor({ name, date }: Omit<Appointment, 'id'>) {
        this.id = uuid();
        this.name = name;
        this.date = date;
    }
}

export default Appointment