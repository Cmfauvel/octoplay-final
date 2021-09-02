export interface User {
    id?: number;
    mail: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    role_id?: number;
    addresses?: [];
    commandes?: []
}