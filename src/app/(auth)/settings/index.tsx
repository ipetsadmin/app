import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Linking, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";

import { Card } from "@/components/ui";
import { setAppLanguage, type AppLanguage } from "@/lib/i18n";
import { getPushPermissionGranted, requestPushPermission } from "@/lib/notifications";
import { fonts, useTheme, type ThemeColors } from "@/theme";

const Settings = () => {
  const { colors, isDark, toggle } = useTheme();
  const { t, i18n } = useTranslation();
  const styles = makeStyles(colors);

  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);

  // Sincroniza el estado del switch con el permiso real cada vez que se enfoca.
  useFocusEffect(
    useCallback(() => {
      getPushPermissionGranted().then(setPushEnabled);
    }, []),
  );

  const onTogglePush = async (value: boolean) => {
    if (value) {
      const granted = await requestPushPermission();
      setPushEnabled(granted);
      // Si el usuario ya había denegado, el sistema no vuelve a preguntar → abrir ajustes.
      if (!granted) Linking.openSettings();
    } else {
      // El permiso no se puede revocar desde la app; se gestiona en ajustes del sistema.
      Linking.openSettings();
    }
  };

  const languages: { code: AppLanguage; label: string }[] = [
    { code: "es", label: t("settings.spanish") },
    { code: "en", label: t("settings.english") },
  ];

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>{t("settings.title").toUpperCase()}</Text>

      {/* Apariencia */}
      <Text style={styles.section}>{t("settings.appearance").toUpperCase()}</Text>
      <Card style={styles.card}>
        <Pressable style={styles.row} onPress={toggle} accessibilityRole="button">
          <Feather name={isDark ? "moon" : "sun"} size={20} color={colors.textMuted} />
          <Text style={styles.rowLabel}>{t("settings.theme")}</Text>
          <Text style={styles.rowValue}>{isDark ? t("settings.dark") : t("settings.light")}</Text>
        </Pressable>
      </Card>

      {/* Idioma */}
      <Text style={styles.section}>{t("settings.language").toUpperCase()}</Text>
      <View style={styles.segment}>
        {languages.map((lang) => {
          const active = i18n.language?.startsWith(lang.code);
          return (
            <Pressable
              key={lang.code}
              onPress={() => setAppLanguage(lang.code)}
              accessibilityRole="button"
              style={[
                styles.segmentItem,
                { borderColor: colors.border },
                active && { backgroundColor: colors.accent, borderColor: colors.accent },
              ]}
            >
              <Text
                style={[styles.segmentText, { color: active ? colors.accentText : colors.textMuted }]}
              >
                {lang.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Canales */}
      <Text style={styles.section}>{t("settings.channels").toUpperCase()}</Text>
      <Card style={styles.card}>
        <View style={styles.channelRow}>
          <Feather name="bell" size={20} color={colors.textMuted} />
          <View style={styles.channelText}>
            <Text style={styles.channelTitle}>{t("settings.push")}</Text>
            <Text style={styles.channelSubtitle}>{t("settings.pushDevice").toUpperCase()}</Text>
          </View>
          <Switch
            value={pushEnabled}
            onValueChange={onTogglePush}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor="#FFFFFF"
            ios_backgroundColor={colors.border}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.channelRow}>
          <Feather name="mail" size={20} color={colors.textMuted} />
          <View style={styles.channelText}>
            <Text style={styles.channelTitle}>{t("settings.email")}</Text>
            <Text style={styles.channelSubtitle}>{t("settings.emailWeekly").toUpperCase()}</Text>
          </View>
          <Switch
            value={emailEnabled}
            onValueChange={setEmailEnabled}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor="#FFFFFF"
            ios_backgroundColor={colors.border}
          />
        </View>
      </Card>
    </ScrollView>
  );
};

const makeStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    content: {
      paddingHorizontal: 24,
      paddingTop: 16,
      paddingBottom: 24,
      gap: 18,
    },
    title: {
      fontFamily: fonts.mono,
      fontSize: 30,
      fontWeight: "800",
      letterSpacing: 4,
      color: colors.text,
    },
    section: {
      fontFamily: fonts.mono,
      fontSize: 12,
      letterSpacing: 2,
      color: colors.label,
      marginBottom: -6,
      marginTop: 6,
    },
    card: {
      paddingVertical: 4,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      paddingVertical: 18,
    },
    rowLabel: {
      flex: 1,
      fontSize: 17,
      color: colors.text,
    },
    rowValue: {
      fontFamily: fonts.mono,
      fontSize: 14,
      letterSpacing: 1,
      color: colors.textMuted,
    },
    segment: {
      flexDirection: "row",
      gap: 12,
    },
    segmentItem: {
      flex: 1,
      height: 52,
      borderRadius: 14,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    segmentText: {
      fontFamily: fonts.mono,
      fontSize: 14,
      letterSpacing: 1.5,
      fontWeight: "600",
    },
    channelRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      paddingVertical: 16,
    },
    channelText: {
      flex: 1,
      gap: 4,
    },
    channelTitle: {
      fontSize: 17,
      color: colors.text,
    },
    channelSubtitle: {
      fontFamily: fonts.mono,
      fontSize: 11,
      letterSpacing: 1.5,
      color: colors.label,
    },
    divider: {
      borderTopWidth: 1,
      borderStyle: "dashed",
      borderColor: colors.border,
    },
  });

export default Settings;
