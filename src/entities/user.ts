import { Entity, Column } from 'typeorm'
import { EntityBase } from './EntityBase'

@Entity()
export class User extends EntityBase {

    @Column()
    id: string

    @Column({ unique: true })
    username: string

    @Column({ unique: true, nullable: true })
    email: string

    @Column()
    password: string

    @Column({ nullable: true })
    isAdmin: boolean
    

    toObject() {
        return {
            displayName: this.username,
            password: this.password,
            email: this.email,
            isAdmin: this.isAdmin
        }
    }
}
