export const incorrectEmailSymbols =
  /!|#|\$|$}\^|\&|\*|\(|\)|_|\+|=|\[|\]|{|}|;|:|'|"|\\|\||,|<|>|\/|\?|~/;

export const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]/;

export const numberPattern = /\d+/g;

export const onlyLetter = /^[a-zA-Z]+$/;

export const nickNameRegex = /[a-zA-Z0-9_.-?!]/
