import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDeckDto {
  @IsString({ message: 'Name is required and must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @Length(2, 24, { message: 'Name must be between 2 and 24 characters' })
  name: string;

  @IsString()
  @Length(0, 100, {
    message: 'Description must be between 0 and 100 characters',
  })
  description: string;
}
