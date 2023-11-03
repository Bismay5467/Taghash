import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsDateString, IsString, Validate } from "class-validator";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum IsVaccinated {
  Yes = "yes",
  No = "no",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @IsString()
  name: string;

  @Column({ type: "enum", enum: Gender })
  gender: Gender;

  @Column({ name: "birth_date", type: "date" })
  @IsDateString()
  @Validate((birthdate: string) => {
    const minDate = new Date("1923-01-01");
    const maxDate = new Date();

    if (new Date(birthdate) < minDate) {
      return "Birthdate should be after 1903-01-01";
    }

    if (new Date(birthdate) > maxDate) {
      return "Birthdate cannot be in the future";
    }

    return true;
  })
  birthDate: string;

  @Column({ name: "is_vaccinated", type: "enum", enum: IsVaccinated })
  isVaccinated: IsVaccinated;
}
