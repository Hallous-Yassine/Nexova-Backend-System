import { Entity, BaseEntity, Column, PrimaryGeneratedColumn , OneToMany , } from "typeorm"
import Task from "./tasks"

//add the rest of the fields to the User entity
@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  full_name: string

  @Column({ unique: true })
  phone: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[]
}

export default User
