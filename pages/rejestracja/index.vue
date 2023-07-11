<template>
  <MoleculeLoginMapAnimation
    text="Zarejestruj się"
    class="md:first-letter:mr-5"
  />
  <div class="flex flex-col md:flex-grow md:max-w-sm">
    <OrganismLoginForm
      :form-fields="userLoginFormFields"
      :errors="errors"
      :is-fields-disabled="isFieldsDisabled"
      @correct-filed="correctFiled"
    />
    <div class="mt-3 w-full">
      <AtomText
        v-if="signUpError"
        class="text-xs text-red-400 mb-1"
        :text="loginError"
      />
      <AtomButton
        class="font-bold py-2 w-full flex justify-center items-center"
        text="Zarejestruj się"
        @click="signUp"
      >
      <AtomLoading class="ml-2" v-if="loading" />
    </AtomButton>
    </div>
    <div class="mt-4 flex justify-center mb-2">
      <AtomText class="text-sm text-neutral-600">
        Masz konto?
        <AtomLink class="ml-3 hover:text-neutral-800" href="/logowanie">
          <span class="underline">Zaloguj się</span>
        </AtomLink>
      </AtomText>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';

/** UTILS */
import UserSignInFormSchema from '@/utils/validations/YupForms/UserSignInFormSchema';
import createFormFields from '@/utils/createFormFields';

definePageMeta({
  layout: 'login',
});

const supabase = useSupabaseClient();

const isFieldsDisabled = ref(false);
const loading = ref(false);
const signUpError = ref('');

const usersignUpForm = useForm({
  validationSchema: UserSignInFormSchema,
  validateOnMount: false,
  initialValues: {
    email: '',
    password: '',
    name: '',
    surname: '',
    nickName: '',
  },
});

const { values, validate, setErrors, setFieldError, errors } = usersignUpForm;
const { fields } = UserSignInFormSchema;

const userLoginFormFields = createFormFields(fields);

const vali = async () => {
  const result = await validate();
  if (result.errors) {
    setErrors(result.errors);
    Object.entries(result.errors).forEach(([fieldName, errorMassage]) => {
      if (fieldName && errorMassage) {
        setFieldError(fieldName as keyof typeof result.errors, errorMassage);
      }
    });
  }

  return result.errors;
};

defineExpose({ vali, values });

const correctFiled = (fieldName: 'email' | 'password', value: string) => {
  setFieldError(fieldName, '');
  values[fieldName] = value;
};

const signUp = async () => {
  signUpError.value = '';
  isFieldsDisabled.value = true;

  try {
    const validateForm = await vali();
    if (Object.keys(validateForm).length !== 0) {
      isFieldsDisabled.value = false;
      return;
    }
    const { email, password, name, surname, nickName } = values;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          surname,
          nickName,
        },
      },
    });

    if (error) throw error as Error;
  } catch (err: Error) {
    console.warn(err.error_description || err.message);

    if (err?.message === 'Invalid login credentials') {
      signUpError.value = 'Nieprawidłowe dane logowania';
    } else {
      signUpError.value = 'Coś poszło nie tak. Spróbuj za chwile';
    }
  } finally {
    loading.value = false;
    isFieldsDisabled.value = false;
  }
};

watch(
  values,
  () => {
    signUpError.value = '';
  },
  { deep: true }
);
</script>
