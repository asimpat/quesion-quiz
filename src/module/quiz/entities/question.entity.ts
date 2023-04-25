import { type } from 'os';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Quiz } from './quiz.entity';
import { Options } from './option.entity';

@Entity('question')
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: 'varchar', 
  })
  question: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)// here you had 
//   @ManyToOne(() => Quiz, (quiz) => quiz) // which is incomplete sir 
  quiz:Question

  @OneToMany(() => Options, (option)=> option.question)
  options:Options[];
}
