import type { es } from "./es";

/** Traducciones en inglés. Debe tener la misma forma que `es`. */
export const en: typeof es = {
  signIn: {
    forgot: "Forgot your password?",
    submit: "Sign in",
    noAccount: "Don't have an account?",
    createAccount: "Create account",
  },
  forgotPassword: {
    overline: "Recovery",
    title: "RESET",
    subtitle: "Enter your account email and we'll send you a link to reset your password.",
    submit: "Send link",
  },
  register: {
    overline: "Sign up",
    title: "CREATE ACCOUNT",
    subtitle: "Create your account to start managing your pets' health.",
    submit: "Create account",
  },
  fields: {
    firstName: { label: "First name", placeholder: "Your first name" },
    lastName: { label: "Last name", placeholder: "Your last name" },
    email: { label: "Email", placeholder: "you@email.com" },
    password: { label: "Password", placeholder: "••••••••" },
  },
  validation: {
    firstNameRequired: "First name is required",
    lastNameRequired: "Last name is required",
    emailRequired: "Email is required",
    emailInvalid: "Invalid email",
    passwordRequired: "Password is required",
    passwordMin: "Minimum 8 characters",
  },
};
