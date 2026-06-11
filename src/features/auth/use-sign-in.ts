import { useMutation } from "@tanstack/react-query";
import { api } from "@/src/libs/client";
import { useAuth } from "@/src/providers/auth-provider";

type SignInInput = {
  email: string;
  password: string;
};

export function useSignIn() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (input: SignInInput) => {
      const response = await api.auth.login(input);
      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Error al iniciar sesión");
      }
      return response.data;
    },
    onSuccess: async (session) => {
      await login(
        { id: session.user.id, email: session.user.email, name: "" },
        session.accessToken,
      );
    },
  });
}
