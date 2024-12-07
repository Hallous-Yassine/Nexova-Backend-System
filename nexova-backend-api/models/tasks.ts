import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    BaseEntity,
    ManyToOne,
  } from "typeorm"
  import User from "./users"
  
  @Entity()
  class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
  
    @Column()
    title: string
  
    @Column()
    description: string
  
    @Column()
    status: string
  
    @Column()
    createdAt: Date
  
    @Column()
    updatedAt: Date
  
    @ManyToOne(() => User, (user) => user.tasks)
    user: User
  }
  
  export default Task