import { useMutation } from "@tanstack/react-query";
import { api } from "@/src/libs/client";
import { useAuth } from "@/src/providers/auth-provider";

type SignUpInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export function useSignUp() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async ({ firstName, lastName, email, password }: SignUpInput) => {
      const res = await api.auth.register({ email, password });
      if (!res.success || !res.data) {
        throw new Error(res.error ?? "Error al crear la cuenta");
      }

      const { accessToken, user } = res.data;

      await api.users.patchProfile(accessToken, {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
      });

      return { user, accessToken };
    },
    onSuccess: async ({ user, accessToken }) => {
      await login({ id: user.id, email: user.email, name: "" }, accessToken);
    },
  });
}
