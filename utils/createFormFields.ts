/** UTILS */
import {
  getMaxValueLength,
  getMinValueLength,
} from '@/utils/validations/helpers';

const createFormFields = (fields: any) => {
  return Object.entries(fields).map(([key, value]: any) => {
    let helper = '';
    let mask;
    let { type } = value;
    let minValueLength;
    let maxValueLength;
    let allowedInputCharacters;
    let icon = '';
    let iconPlacement = '';
    let disabledHelperMessageOnError = true;
    let capitalizeInput = true;

    minValueLength = getMinValueLength(value);
    maxValueLength = getMaxValueLength(value);
    allowedInputCharacters = value.spec?.meta?.allowedInputCharacters;

    if (key === 'password' || key === 'passwordConfirm') {
      type = 'password';
      iconPlacement = 'left';
      icon = 'ic:baseline-lock';
      capitalizeInput = false;
    }

    if (key === 'email') {
      type = 'email';
      iconPlacement = 'left';
      icon = 'material-symbols:mail-outline';
      capitalizeInput = false;
    }

    if (key === 'name' || key === 'surname' || key === 'nickName' ) {
      iconPlacement = 'left';
      icon = 'subway:admin';
    }

    if(key === 'nickName') {
      capitalizeInput = false;
    }

    const filed = {
      name: key,
      label: value.spec.label,
      isRequireStar: !value.spec.optional,
      isOptional: value.spec.optional,
      type,
      helper,
      mask,
      minValueLength,
      maxValueLength,
      allowedInputCharacters,
      icon,
      iconPlacement,
      disabledHelperMessageOnError,
      capitalizeInput
    };

    return filed;
  });
};

export default createFormFields;
