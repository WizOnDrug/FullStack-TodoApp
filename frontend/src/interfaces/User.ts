export interface IUser {
    id?: number | null,
    name: string,
    createdAt?: Date | null,
    updatedAt?: Date | null
}

export class User implements IUser {
    public id: null; 
    public name: string;
    public createdAt!: Date | null;
    public updatedAt!: Date | null;

    constructor(){
        this.id = null; 
        this.name = "";
        this.createdAt = null;
        this.updatedAt = null;
    }
}