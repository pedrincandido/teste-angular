export class CityViewModel {
    id: number;
    name: string;
    stateId: string;

    constructor(c) {
        this.id = c.id ? c.id : null;
        this.name = c.name ? c.name : null;
        this.stateId = c.stateId ? c.stateId : null;

    }
}
