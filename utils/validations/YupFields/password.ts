import * as yup from 'yup';
import { passwordRules } from '@/utils/validations/regexRules';

export const password = yup
  .string()
  .nullable()
  .required('Podaj hasło.')
  .min(7, 'Hasło jest za krótkie.')
  .max(150, 'Hasło jest za długie.')
  .test(
    'correctPassword',
    'Hasło musi zawierać: znak specjalny, liczbę, wielką lietrę',
    (item) => new RegExp(passwordRules).test(item || '')
  )
  .label('Hasło');

export default password;
