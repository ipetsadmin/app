import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/ui";
import { dailyTip, dummyAgenda } from "@/constants";
import type { AgendaCategory } from "@/features/dashboard";
import { getPetById, PetAvatar } from "@/features/pets";
import { useAuth } from "@/providers";
import { fonts, useTheme, type ThemeColors } from "@/theme";

const ORDER: AgendaCategory[] = ["vaccine", "birthday", "medication"];

const categoryIcon = (category: AgendaCategory, color: string) => {
  switch (category) {
    case "vaccine":
      return <MaterialCommunityIcons name="needle" size={20} color={color} />;
    case "birthday":
      return <Feather name="gift" size={20} color={color} />;
    case "medication":
      return <MaterialCommunityIcons name="pill" size={20} color={color} />;
  }
};

const Dashboard = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { user } = useAuth();
  const styles = makeStyles(colors);

  const firstName = user?.name?.split(" ")[0] ?? "Mateo";

  const groups = ORDER.map((category) => ({
    category,
    items: dummyAgenda.filter((a) => a.category === category),
  })).filter((g) => g.items.length > 0);

  const pending = String(dummyAgenda.length).padStart(2, "0");

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t("dashboard.title").toUpperCase()}</Text>
        <Text style={styles.welcome}>{t("dashboard.welcome", { name: firstName })}</Text>
      </View>

      {/* Dato del día */}
      <Card style={styles.tipCard}>
        <View style={styles.tipHeader}>
          <View style={styles.tipOverline}>
            <View style={[styles.dot, { backgroundColor: colors.accent }]} />
            <Text style={styles.overline}>{t("dashboard.dailyTip").toUpperCase()}</Text>
          </View>
          <Text style={styles.overline}>{dailyTip.tag.toUpperCase()}</Text>
        </View>
        <View style={styles.divider} />
        <Text style={styles.tipText}>{dailyTip.text}</Text>
      </Card>

      {/* Agenda por categoría */}
      <View style={styles.sectionRow}>
        <Text style={styles.section}>{t("dashboard.agendaByCategory").toUpperCase()}</Text>
        <Text style={styles.section}>{t("dashboard.pending", { count: pending }).toUpperCase()}</Text>
      </View>

      {groups.map((group) => (
        <Card key={group.category} style={styles.groupCard}>
          <View style={styles.groupHeader}>
            <View style={styles.iconBadge}>{categoryIcon(group.category, colors.text)}</View>
            <Text style={styles.groupTitle}>{t(`dashboard.categories.${group.category}`)}</Text>
            <Text style={styles.count}>{String(group.items.length).padStart(2, "0")}</Text>
          </View>

          {group.items.map((item) => {
            const pet = getPetById(item.petId);
            return (
              <Fragment key={item.id}>
                <View style={styles.divider} />
                <View style={styles.itemRow}>
                  {pet ? <PetAvatar name={pet.name} species={pet.species} size={48} /> : null}
                  <View style={styles.itemText}>
                    <Text style={styles.itemTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.itemMeta} numberOfLines={1}>
                      {`${pet?.name ?? ""} · ${item.date}`.toUpperCase()}
                    </Text>
                  </View>
                  <View style={[styles.pill, { borderColor: colors.border }]}>
                    <Text style={styles.pillText}>{item.daysLeft}D</Text>
                  </View>
                </View>
              </Fragment>
            );
          })}
        </Card>
      ))}
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
    header: {
      gap: 6,
      marginBottom: 2,
    },
    title: {
      fontFamily: fonts.mono,
      fontSize: 30,
      fontWeight: "800",
      letterSpacing: 4,
      color: colors.text,
    },
    welcome: {
      fontSize: 15,
      color: colors.textMuted,
    },
    tipCard: {
      gap: 16,
    },
    tipHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    tipOverline: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    dot: {
      width: 7,
      height: 7,
      borderRadius: 4,
    },
    overline: {
      fontFamily: fonts.mono,
      fontSize: 12,
      letterSpacing: 2,
      color: colors.label,
    },
    tipText: {
      fontSize: 22,
      lineHeight: 32,
      color: colors.text,
      fontWeight: "500",
    },
    sectionRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 4,
    },
    section: {
      fontFamily: fonts.mono,
      fontSize: 12,
      letterSpacing: 2,
      color: colors.label,
    },
    groupCard: {
      gap: 4,
      paddingVertical: 16,
    },
    groupHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      paddingBottom: 12,
    },
    iconBadge: {
      width: 44,
      height: 44,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.inputBg,
      alignItems: "center",
      justifyContent: "center",
    },
    groupTitle: {
      flex: 1,
      fontSize: 20,
      fontWeight: "600",
      color: colors.text,
    },
    count: {
      fontFamily: fonts.mono,
      fontSize: 22,
      fontWeight: "800",
      letterSpacing: 2,
      color: colors.textMuted,
    },
    itemRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingTop: 14,
    },
    itemText: {
      flex: 1,
      gap: 4,
    },
    itemTitle: {
      fontSize: 18,
      color: colors.text,
    },
    itemMeta: {
      fontFamily: fonts.mono,
      fontSize: 12,
      letterSpacing: 1,
      color: colors.label,
    },
    pill: {
      borderWidth: 1,
      borderRadius: 100,
      paddingHorizontal: 14,
      paddingVertical: 6,
    },
    pillText: {
      fontFamily: fonts.mono,
      fontSize: 12,
      letterSpacing: 1,
      color: colors.textMuted,
    },
    divider: {
      borderTopWidth: 1,
      borderStyle: "dashed",
      borderColor: colors.border,
    },
  });

export default Dashboard;
