import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { MESSAGE, REGEX } from 'src/module/utils/user.utils';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
//   @Length(8, 24)
//   @Matches(REGEX.PASSWORD_RULE, {
//       message:MESSAGE.PASSWORD_MESSAGE
//   })
  password: string;

  @IsNotEmpty()
  @IsString()
//   @Length(8, 24)
//   @Matches(REGEX.PASSWORD_RULE, {
//       message:MESSAGE.PASSWORD_MESSAGE
//   })
  confirmPassword: string;
}
