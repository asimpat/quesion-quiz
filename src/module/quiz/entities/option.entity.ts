import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity('options')
export class Options extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: 'varchar', 
  })
  text: string;

  @Column({ 
    type:'boolean', 
    default:1
  })
  IsCorrect: boolean;

  @ManyToOne(() => Question, (question) => question.options)
  question:Question;
}
