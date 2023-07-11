import * as yup from 'yup';
import { onlyLetter } from '@/utils/validations/regexRules';

const name = yup
  .string()
  .nullable()
  .min(2, 'Imię jest za krótkie.')
  .max(150, 'Imię jest za długie.')
  .trim()
  .matches(onlyLetter, 'Imię nie może zawierać cyfr ani znaków specjalnych.')
  .label('Imię');

export default name;
