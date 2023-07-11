import * as yup from 'yup';

import {
  email,
  password,
  name,
  surname,
  nickName,
} from '@/utils/validations/YupFields';

const UserSignInFormSchema = yup.object({
  name: name.required('Imię jest wymagane.'),
  surname: surname.required('Nazwisko jest wymagane.'),
  nickName: nickName.required('Nazwa użytkownika jest wymagane.'),
  email,
  password,
  passwordConfirm: password.oneOf([yup.ref('password')], 'Hasła nie są takie same.').label('Powtórz hasło')
});

export default UserSignInFormSchema;
