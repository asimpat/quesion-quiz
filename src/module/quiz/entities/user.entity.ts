import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('user')
  export class User{
   @PrimaryGeneratedColumn()
   id:number

   @Column()
   name:string

   @Column({
    unique:true
   })
   email:string

   @Column()
   password:string

   @UpdateDateColumn()
   updatedAt: Date;
 
   @CreateDateColumn()
   createdAt: Date;
  }
  