export interface IUser {
    id?: number | null,
    name: string,
    title : string,
    status:string,
    createdAt?: Date | null,
    updatedAt?: Date | null
}

export class User implements IUser {
    public id: null; 
    public name: string;
    public title: string;
    public status: string;
    public createdAt!: Date | null;
    public updatedAt!: Date | null;

    constructor(){
        this.id = null; 
        this.name = "";
        this.title = "";
        this.status = "";
        this.createdAt = null;
        this.updatedAt = null;
    }
}