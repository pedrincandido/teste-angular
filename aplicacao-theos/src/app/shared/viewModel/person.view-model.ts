export class PersonViewModel {
    id: number;
    name: string;
    birthDate: Date;
    cpf: string;
    email: string;
    genderId: number;

    constructor(p) {
        this.id = p.id ? p.id : null;
        this.name = p.name ? p.name : null;
        this.birthDate = p.birthDate ? p.birthDate : null;
        this.cpf = p.cpf ? p.cpf : null;
        this.email = p.email ? p.email : null;
        // this.genderId = p.gender ? this.genderId : null;
    }
}
