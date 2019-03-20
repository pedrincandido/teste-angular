import { PersonViewModel } from './person.view-model';

export class BookViewModel {
    id: number;
    title: string;
    description: string;
    url: string;
    publishingCompany: string;
    edition: number;
    pages: number;
    personId: number;
    person: PersonViewModel;
    yearPublication: number;
    constructor(b) {
        this.id = b.id ? b.id : null;
        this.title = b.title ? b.title : null;
        this.description = b.description !== null ? b.description : null;
        this.url = b.url !== null ? b.url : null;
        this.publishingCompany = b.publishingCompany ? b.publishingCompany : null;
        this.edition = b.edition ? b.edition : null;
        this.pages = b.pages ? b.pages : null;
        this.yearPublication = b.yearPublication ? b.yearPublication : null;
    }
}
