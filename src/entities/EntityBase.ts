import { BaseEntity, UpdateDateColumn, PrimaryColumn, Column } from 'typeorm'

export abstract class EntityBase extends BaseEntity {
    @PrimaryColumn()
    id: string

    @Column()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    constructor() {
        super()
        this.createdAt = new Date()
        this.updatedAt = new Date()
    }
}
