import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class Admin extends BaseEntity {
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
}

export default Admin