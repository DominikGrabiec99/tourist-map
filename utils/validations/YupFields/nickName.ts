import * as yup from 'yup';
import { nickNameRegex } from '@/utils/validations/regexRules';

const nickName = yup
  .string()
  .nullable()
  .trim()
  .min(5, 'Nazwa użytkownika jest za krótkie.')
  .max(50, 'Nazwa użytkownika jest za długie.')
  .matches(nickNameRegex, 'Imię nie może zawierać cyfr ani znaków specjalnych.')
  .label('Nazwa użytkownika');

export default nickName;
