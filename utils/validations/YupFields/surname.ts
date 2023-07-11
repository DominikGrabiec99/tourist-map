import * as yup from 'yup';
import { onlyLetter } from '@/utils/validations/regexRules';

const surname = yup
  .string()
  .nullable()
  .trim()
  .min(2, 'Nazwisko jest za krótkie.')
  .max(150, 'Nazwisko jest za długie.')
  .matches(onlyLetter, 'Nazwisko nie może zawierać cyfr ani znaków specjalnych.')
  .label('Nazwisko');

export default surname;