import { Gender, IsVaccinated } from "../server/entities/user.entity";

export type TGender = Gender.Male | Gender.Female | Gender.Other
export type TIsVaccinated = IsVaccinated.Yes | IsVaccinated.No

export type TData = {
  name : string;
  gender : TGender;
  birthDate : string;
  isVaccinated : TIsVaccinated;
}