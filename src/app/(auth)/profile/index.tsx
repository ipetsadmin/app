import { Feather } from "@expo/vector-icons";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/ui";
import { useProfile } from "@/entities";
import { useAuth } from "@/providers";
import { fonts, useTheme, type ThemeColors } from "@/theme";

const Profile = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { data: profile } = useProfile();
  const styles = makeStyles(colors);

  // El nombre/teléfono/ciudad vienen del perfil; mock como fallback hasta tener datos.
  const name = profile?.profile?.fullName ?? "Mateo Ríos";
  const email = profile?.email ?? user?.email ?? "mateo@truffa.app";
  const phone = profile?.profile?.phone ?? "+54 9 11 5555 0142";
  const city = profile?.profile?.location?.city ?? "Buenos Aires";
  const initial = name.charAt(0).toUpperCase();

  const dataRows = [
    { icon: "user", label: t("profile.fields.name"), value: name },
    { icon: "mail", label: t("profile.fields.email"), value: email },
    { icon: "phone", label: t("profile.fields.phone"), value: phone },
    { icon: "home", label: t("profile.fields.city"), value: city },
  ] as const;

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t("profile.title").toUpperCase()}</Text>
      </View>

      {/* Card de perfil */}
      <Card style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.email} numberOfLines={1}>
            {email.toUpperCase()}
          </Text>
        </View>
      </Card>

      {/* Stats */}
      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>03</Text>
          <Text style={styles.statLabel}>{t("profile.stats.pets").toUpperCase()}</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>10</Text>
          <Text style={styles.statLabel}>{t("profile.stats.events").toUpperCase()}</Text>
        </Card>
      </View>

      {/* Datos personales */}
      <Text style={styles.section}>{t("profile.personalData").toUpperCase()}</Text>
      <Card style={styles.dataCard}>
        {dataRows.map((row, i) => (
          <Fragment key={row.label}>
            {i > 0 ? <View style={styles.divider} /> : null}
            <View style={styles.dataRow}>
              <Feather name={row.icon} size={18} color={colors.textMuted} style={styles.dataIcon} />
              <View style={styles.dataText}>
                <Text style={styles.dataLabel}>{row.label.toUpperCase()}</Text>
                <Text style={styles.dataValue}>{row.value}</Text>
              </View>
            </View>
          </Fragment>
        ))}
      </Card>

      {/* Cerrar sesión */}
      <Pressable
        onPress={logout}
        style={({ pressed }) => [styles.signOut, { opacity: pressed ? 0.7 : 1 }]}
        accessibilityRole="button"
      >
        <Feather name="log-out" size={18} color={colors.danger} />
        <Text style={styles.signOutText}>{t("profile.signOut").toUpperCase()}</Text>
      </Pressable>
    </ScrollView>
  );
};

const makeStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    content: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 24,
      gap: 18,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      fontFamily: fonts.mono,
      fontSize: 24,
      fontWeight: "800",
      letterSpacing: 4,
      color: colors.text,
    },
    profileCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.inputBg,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText: {
      fontFamily: fonts.mono,
      fontSize: 22,
      fontWeight: "700",
      color: colors.textMuted,
    },
    profileInfo: {
      flex: 1,
      gap: 5,
    },
    name: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
    },
    email: {
      fontFamily: fonts.mono,
      fontSize: 12,
      letterSpacing: 1.5,
      color: colors.textMuted,
    },
    statsRow: {
      flexDirection: "row",
      gap: 14,
    },
    statCard: {
      flex: 1,
      alignItems: "center",
      gap: 6,
      paddingVertical: 20,
    },
    statValue: {
      fontFamily: fonts.mono,
      fontSize: 30,
      fontWeight: "800",
      letterSpacing: 3,
      color: colors.text,
    },
    statLabel: {
      fontFamily: fonts.mono,
      fontSize: 11,
      letterSpacing: 2,
      color: colors.textMuted,
    },
    section: {
      fontFamily: fonts.mono,
      fontSize: 11,
      letterSpacing: 2,
      color: colors.label,
      marginBottom: -8,
      marginTop: 4,
    },
    dataCard: {
      paddingVertical: 2,
    },
    dataRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingVertical: 14,
    },
    dataIcon: {
      width: 22,
      textAlign: "center",
    },
    dataText: {
      flex: 1,
      gap: 3,
    },
    dataLabel: {
      fontFamily: fonts.mono,
      fontSize: 10,
      letterSpacing: 1.5,
      color: colors.label,
    },
    dataValue: {
      fontSize: 15,
      color: colors.text,
    },
    divider: {
      borderTopWidth: 1,
      borderStyle: "dashed",
      borderColor: colors.border,
    },
    signOut: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      height: 52,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: colors.danger,
      marginTop: 6,
    },
    signOutText: {
      fontFamily: fonts.mono,
      fontSize: 13,
      letterSpacing: 2,
      fontWeight: "600",
      color: colors.danger,
    },
  });

export default Profile;
