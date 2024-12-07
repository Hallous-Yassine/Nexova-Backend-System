import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import sensordevice from "./sensorDevice"; // Import the SensorDevice entity

@Entity()
class Alert extends BaseEntity {
  @PrimaryGeneratedColumn()
  alert_id: number;

  @ManyToOne(() => sensordevice, (device) => device.device_id, { onDelete: "CASCADE" }) // Establish foreign key relation
  @JoinColumn({ name: "device_id" })
  device: sensordevice;

  @Column({ type: "float" })
  value: number;

  @Column({ type: "float" })
  threshold: number;

  @Column({ type: "varchar", length: 255 })
  message: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  timestamp: Date;
}

export default Alert;
