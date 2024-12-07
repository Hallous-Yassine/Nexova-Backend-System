import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum DeviseStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  FAULTY = "faulty",
}

@Entity()
class SensorDevice extends BaseEntity {
  @PrimaryGeneratedColumn()
  device_id: number;

  @Column({ type: "varchar", length: 100 })
  device_name: string;

  @Column({ type: "varchar", length: 50 })
  device_type: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  location: string;

  @Column({ type: "enum", enum: DeviseStatus, default: DeviseStatus.INACTIVE })
  status: DeviseStatus;

  @Column({ type: "float", nullable: true }) // Threshold column
  threshold: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}

export default SensorDevice;
