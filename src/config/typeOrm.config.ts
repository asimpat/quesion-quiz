import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Question } from 'src/module/quiz/entities/question.entity';
import { Quiz } from 'src/module/quiz/entities/quiz.entity';

config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities:[Quiz, Question],
        synchronize: true,
}