import { IsNotEmpty, IsString } from "class-validator"

export class CreateQuestionDto{

    @IsNotEmpty() 
    quizId:number


    @IsNotEmpty()
    @IsString()
    question:string


    
}