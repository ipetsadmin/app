import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AuthHeader, Card } from "@/components/ui";
import { getPetById, PetAvatar } from "@/features/pets";
import { fonts, useTheme, type ThemeColors } from "@/theme";

const PetDetail = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = makeStyles(colors);
  const { id } = useLocalSearchParams<{ id: string }>();
  const pet = getPetById(id);

  if (!pet) {
    return (
      <View style={[styles.empty, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.textMuted }}>—</Text>
      </View>
    );
  }

  const rows: { icon: keyof typeof Feather.glyphMap; label: string; value: string }[] = [
    { icon: "github", label: t("pets.detail.species"), value: t(`pets.species.${pet.species}`) },
    { icon: "bookmark", label: t("pets.detail.breed"), value: pet.breed },
    { icon: "user", label: t("pets.new.fields.sex"), value: t(`pets.new.fields.${pet.sex}`) },
    { icon: "calendar", label: t("pets.detail.age"), value: `${pet.ageYears}a ${pet.ageMonths}m` },
    ...(pet.birthDate
      ? [{ icon: "gift" as const, label: t("pets.new.fields.birthDate"), value: pet.birthDate }]
      : []),
    ...(pet.weightKg != null
      ? [{ icon: "briefcase" as const, label: t("pets.new.fields.weight"), value: `${pet.weightKg} kg` }]
      : []),
  ];

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <AuthHeader overline={t("pets.detail.overline")} title={pet.name.toUpperCase()} />

      <Card style={styles.headCard}>
        <PetAvatar name={pet.name} species={pet.species} size={72} />
        <View style={styles.headInfo}>
          <Text style={styles.headName} numberOfLines={1}>
            {pet.name}
          </Text>
          <Text style={styles.headMeta} numberOfLines={1}>
            {`${t(`pets.species.${pet.species}`)} • ${pet.breed}`.toUpperCase()}
          </Text>
        </View>
      </Card>

      <Card style={styles.dataCard}>
        {rows.map((row, i) => (
          <Fragment key={row.label}>
            {i > 0 ? <View style={styles.divider} /> : null}
            <View style={styles.dataRow}>
              <Feather name={row.icon} size={20} color={colors.textMuted} style={styles.dataIcon} />
              <View style={styles.dataText}>
                <Text style={styles.dataLabel}>{row.label.toUpperCase()}</Text>
                <Text style={styles.dataValue}>{row.value}</Text>
              </View>
            </View>
          </Fragment>
        ))}
      </Card>

      {pet.nextEvent ? (
        <>
          <Text style={styles.section}>{t("pets.detail.nextEvent").toUpperCase()}</Text>
          <Card style={styles.eventCard}>
            <Feather name={pet.nextEvent.icon} size={20} color={colors.textMuted} />
            <View style={styles.dataText}>
              <Text style={styles.dataValue}>{pet.nextEvent.label}</Text>
              <Text style={styles.dataLabel}>{pet.nextEvent.date.toUpperCase()}</Text>
            </View>
          </Card>
        </>
      ) : null}
    </ScrollView>
  );
};

const makeStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    empty: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      paddingHorizontal: 24,
      paddingTop: 8,
      paddingBottom: 24,
      gap: 18,
    },
    headCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 18,
    },
    headInfo: {
      flex: 1,
      gap: 6,
    },
    headName: {
      fontFamily: fonts.mono,
      fontSize: 26,
      fontWeight: "800",
      letterSpacing: 2,
      color: colors.text,
    },
    headMeta: {
      fontFamily: fonts.mono,
      fontSize: 12,
      letterSpacing: 1.5,
      color: colors.textMuted,
    },
    dataCard: {
      paddingVertical: 4,
    },
    dataRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      paddingVertical: 16,
    },
    dataIcon: {
      width: 24,
      textAlign: "center",
    },
    dataText: {
      flex: 1,
      gap: 4,
    },
    dataLabel: {
      fontFamily: fonts.mono,
      fontSize: 11,
      letterSpacing: 1.5,
      color: colors.label,
    },
    dataValue: {
      fontSize: 18,
      color: colors.text,
    },
    divider: {
      borderTopWidth: 1,
      borderStyle: "dashed",
      borderColor: colors.border,
    },
    section: {
      fontFamily: fonts.mono,
      fontSize: 12,
      letterSpacing: 2,
      color: colors.label,
      marginBottom: -8,
      marginTop: 4,
    },
    eventCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
  });

export default PetDetail;
