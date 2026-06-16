import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/ui";
import { PetAvatar, pets, type Pet } from "@/features/pets";
import { fonts, useTheme, type ThemeColors } from "@/theme";

const Pets = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = makeStyles(colors);

  const count = String(pets.length).padStart(2, "0");

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} colors={colors} styles={styles} t={t} />
      ))}

      {/* Agregar mascota */}
      <Pressable onPress={() => router.push("/pets/new")} accessibilityRole="button">
        <View style={styles.addCard}>
          <Feather name="plus" size={20} color={colors.textMuted} />
          <Text style={styles.addText}>{t("pets.addPet").toUpperCase()}</Text>
        </View>
      </Pressable>

      <Text style={styles.footer}>{t("pets.registered", { count }).toUpperCase()}</Text>
    </ScrollView>
  );
};

type PetCardProps = {
  pet: Pet;
  colors: ThemeColors;
  styles: ReturnType<typeof makeStyles>;
  t: ReturnType<typeof useTranslation>["t"];
};

function PetCard({ pet, colors, styles, t }: PetCardProps) {
  const meta = `${t(`pets.species.${pet.species}`)} • ${pet.breed} • ${pet.ageYears}a ${pet.ageMonths}m`;

  return (
    <Pressable
      onPress={() => router.push({ pathname: "/pets/[id]", params: { id: pet.id } })}
      accessibilityRole="button"
    >
      <Card style={styles.petCard}>
        <PetAvatar name={pet.name} species={pet.species} size={56} />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {pet.name}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {meta}
          </Text>
          {pet.nextEvent ? (
            <View style={styles.nextRow}>
              <Feather name={pet.nextEvent.icon} size={14} color={colors.textMuted} />
              <Text style={styles.next}>
                {t("pets.next")} {pet.nextEvent.label} · {pet.nextEvent.date}
              </Text>
            </View>
          ) : null}
        </View>
        <Feather name="chevron-right" size={20} color={colors.textMuted} />
      </Card>
    </Pressable>
  );
}

const makeStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    content: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 24,
      gap: 14,
    },
    petCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingVertical: 16,
    },
    info: {
      flex: 1,
      gap: 5,
    },
    name: {
      fontFamily: fonts.mono,
      fontSize: 20,
      fontWeight: "800",
      letterSpacing: 2,
      color: colors.text,
    },
    meta: {
      fontFamily: fonts.mono,
      fontSize: 11,
      letterSpacing: 1,
      color: colors.textMuted,
      textTransform: "uppercase",
    },
    nextRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
      marginTop: 2,
    },
    next: {
      flex: 1,
      fontFamily: fonts.mono,
      fontSize: 11,
      letterSpacing: 1,
      lineHeight: 17,
      color: colors.label,
      textTransform: "uppercase",
    },
    addCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      height: 64,
      borderRadius: 16,
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: colors.border,
    },
    addText: {
      fontFamily: fonts.mono,
      fontSize: 13,
      letterSpacing: 2,
      color: colors.textMuted,
    },
    footer: {
      fontFamily: fonts.mono,
      fontSize: 11,
      letterSpacing: 2,
      color: colors.label,
      textAlign: "center",
      marginTop: 6,
    },
  });

export default Pets;
