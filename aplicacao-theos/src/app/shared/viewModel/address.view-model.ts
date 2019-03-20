export class AddressViewModel {
    id: number;
    street: string;
    number: number;
    neighborhood: string;
    cep: string;
    complement: string;
    personId: number;
    cityId: number;

    constructor(a) {
        this.id = a.id ? a.id : null;
        this.street = a.street ? a.street : null;
        this.number = a.number ? a.number : null;
        this.neighborhood = a.neighborhood ? a.neighborhood : null;
        this.cep = a.cep ? a.cep : null;
        this.complement = a.complement ? a.complement : null;
        this.personId = a.personId ? a.personId : null;
        this.cityId = a.cityId ? a.cityId : null;
    }
}
