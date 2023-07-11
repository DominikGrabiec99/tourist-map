import * as yup from 'yup';
import { incorrectEmailSymbols } from '@/utils/validations/regexRules';

export const email = yup
  .string()
  .nullable()
  .max(150, 'E-mail jest za długi.')
  .email('E-mail jest niekompletny. Poprawny format to nazwa@domena.pl')
  .trim()
  .test(
    'correctEmail',
    'Podaj poprawny adres e-mail.',
    (item) => !new RegExp(incorrectEmailSymbols).test(item || '')
  )
  .required('Podaj e-mail.')
  .label('E-mail');

export default email;
