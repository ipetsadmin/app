import { router } from "expo-router";
import { useTranslation } from "react-i18next";

import { AuthHeader, KeyboardScreen } from "@/components/ui";
import { PetForm, type PetFormValues } from "@/features/pets";

const NewPet = () => {
  const { t } = useTranslation();

  const handleSubmit = async (values: PetFormValues) => {
    // TODO: persistir la mascota (axios) e invalidar la lista.
    console.log("new-pet", values);
    router.back();
  };

  return (
    <KeyboardScreen>
      <AuthHeader title={t("pets.new.title").toUpperCase()} />
      <PetForm onSubmit={handleSubmit} onCancel={() => router.back()} />
    </KeyboardScreen>
  );
};

export default NewPet;
