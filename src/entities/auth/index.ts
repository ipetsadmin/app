// Las mutaciones de sesión (login/register/logout) viven en el AuthProvider;
// aquí solo van las llamadas de auth sin estado de sesión (ej. verify-email).
export * from "./queries";
export * from "./mutations";
