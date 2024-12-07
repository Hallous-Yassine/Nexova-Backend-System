import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import sensordevice from "./sensorDevice"; // Import the iotdevice entity

@Entity()
class SensorData extends BaseEntity {
  @PrimaryGeneratedColumn()
  data_id: number;

  @ManyToOne(() => sensordevice, (device) => device.device_id, { onDelete: "CASCADE" }) // Establish foreign key relation
  @JoinColumn({ name: "device_id" })
  device: sensordevice;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  timestamp: Date;

  @Column({ type: "varchar", length: 50 })
  data_type: string;

  @Column({ type: "float" })
  value: number;
}

export default SensorData;
