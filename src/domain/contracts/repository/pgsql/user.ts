import User from 'src/domain/entities/user';

export interface UserRepository {
    create(contact: User): Promise<User>;
    getAll(): Promise<User[]>;
    getByUuid(uuid: string): Promise<User> 
    getByEmail(uuid: string): Promise<User> 
}