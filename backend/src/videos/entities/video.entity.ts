import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'videos',
})
export class VideoEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'varchar', unique: true, length: 200 })
  videoName: string;

  @Column({ type: 'text', name: 'file_name', nullable: true })
  fileName: string;

  @Column({
    type: 'timestamp',
    name: 'created_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdTime: string;

  @Column({
    name: 'extension',
    type: 'varchar',
    nullable: true,
  })
  extension: string;

  @Column({
    type: 'timestamp',
    name: 'updated_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedTime: string;
}
