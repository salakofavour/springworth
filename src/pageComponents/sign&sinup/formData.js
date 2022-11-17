export const signUpFields = [
  {
    type: "text",
    label: "Name",
    name: "name",
    minLength: 3,
  },
  {
    type: "email",
    label: "E-mail",
    name: "email",
    minLength: 5,
  },
  {
    type: "password",
    label: "Password",
    name: "password",
    minLength: 6,
  },
];

export const signInFields = [
  {
    type: "email",
    label: "E-mail",
    name: "email",
    minLength: 5,
  },
  {
    type: "password",
    label: "Password",
    name: "password",
    minLength: 6,
  },
];

export const forgotPasswordField = [
  {
    type: "email",
    label: "E-mail",
    name: "email",
    minLength: 5,
  },
];
