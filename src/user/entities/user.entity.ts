export class User {
    toObject() {
        throw new Error('Method not implemented.');
    }
    readonly username: string;
    readonly password: string;
    readonly isAdmin: boolean;
}
