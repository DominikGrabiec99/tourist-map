import * as yup from 'yup';

import { email, password } from '@/utils/validations/YupFields';

const UserLoginFormSchema = yup.object({
  email,
  password
})

export default UserLoginFormSchema