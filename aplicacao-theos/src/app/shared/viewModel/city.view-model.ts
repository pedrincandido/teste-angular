export class CityViewModel {
    name: string;
    stateId: string;

    constructor(c) {
        this.name = c.name ? c.name : null;
        this.stateId = c.stateId ? c.stateId : null;

    }
}
