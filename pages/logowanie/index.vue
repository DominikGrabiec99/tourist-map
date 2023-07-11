<template>
  <MoleculeLoginMapAnimation text="Zaloguj się" class="md:first-letter:mr-5" />
  <div class="flex flex-col md:flex-grow md:max-w-sm">
    <OrganismLoginForm
      :form-fields="userLoginFormFields"
      :errors="errors"
      :is-fields-disabled="isFieldsDisabled"
      @correct-filed="correctFiled"
    />
    <div>
      <AtomLink
        class="helper-msg mt-1 text-xs cursor-pointer text-neutral-500 font-semibold"
        href="/przypomnij-haslo"
        >Zapomnaiłeś hasła?</AtomLink
      >
      <!-- TODO add remember me -->
    </div>
    <div class="mt-3 w-full">
      <AtomText
        v-if="loginError"
        class="text-xs text-red-400 mb-1"
        :text="loginError"
      />
      <AtomButton
        class="font-bold py-2 w-full flex justify-center items-center"
        text="Zaloguj się"
        :disabled="loading"
        @click="handleLogin"
      >
        <AtomLoading class="ml-2" v-if="loading" />
      </AtomButton>
    </div>
    <div class="mt-6 h-0.5 bg-slate-200 relative">
      <span
        class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-lg text-slate-300"
        >Lub</span
      >
    </div>
    <div class="mt-6 flex justify-center gap-3">
      <MoleculeLoginIconOptions :loginOptions="loginOptions" />
    </div>
    <div class="mt-4 flex justify-center mb-2">
      <AtomText class="text-sm text-neutral-600">
        Nie masz konta?
        <AtomLink class="ml-3 hover:text-neutral-800" href="/rejestracja">
          <span class="underline">Zarejestruj się</span>
        </AtomLink>
      </AtomText>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
/** UTILS */
import UserLoginFormSchema from '@/utils/validations/YupForms/UserLoginFormSchema';
import createFormFields from '@/utils/createFormFields';
import getURL from '@/utils/getURL';

const supabase = useSupabaseClient();

definePageMeta({
  layout: 'login',
});

const isFieldsDisabled = ref(false);
const loading = ref(false);
const loginError = ref('');

const userLoginForm = useForm({
  validationSchema: UserLoginFormSchema,
  validateOnMount: false,
  initialValues: {
    email: '',
    password: '',
  },
});

const { values, validate, setErrors, setFieldError, errors } = userLoginForm;
const { fields } = UserLoginFormSchema;

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

const handleLogin = async () => {
  loginError.value = '';
  isFieldsDisabled.value = true;
  loading.value = true;
  try {
    const validateForm = await vali();
    if (Object.keys(validateForm).length !== 0) return;
    const { email, password } = values;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error as Error;
  } catch (err: Error) {
    console.warn(err.error_description || err.message);

    if (err?.message === 'Invalid login credentials') {
      loginError.value = 'Nieprawidłowe dane logowania';
    } else {
      loginError.value = 'Coś poszło nie tak. Spróbuj za chwile';
    }
  } finally {
    loading.value = false;
    isFieldsDisabled.value = false;
  }
};

const loginWithGithub = async () => {
  loading.value = true;
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: getURL(),
      },
    });
    if (error) throw error as Error;
    loading.value = true;
  } catch (err: Error) {
    console.warn(err.error_description || err.message);
    loading.value = true;
  }
};

const loginOptions = [
  {
    id: 1,
    name: 'GitHub',
    icon: 'octicon:mark-github-16',
    loginFn: loginWithGithub,
  },
];

watch(
  values,
  () => {
    loginError.value = '';
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
.login-container {
  @media (min-width: $tablet-min) {
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
      ),
      url('/public/images/map_view.png') no-repeat;
    background-size: cover;
  }
}
</style>
