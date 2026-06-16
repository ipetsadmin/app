import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { cloneElement, isValidElement, useMemo, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Button, Input } from "@/components/ui";
import { fonts, useTheme, type ThemeColors } from "@/theme";

import { createPetSchema, type PetFormValues } from "./schema";

type PetFormProps = {
  onSubmit: (values: PetFormValues) => Promise<void> | void;
  onCancel?: () => void;
};

export function PetForm({ onSubmit, onCancel }: PetFormProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = makeStyles(colors);
  const schema = useMemo(() => createPetSchema(t), [t]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PetFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { species: "dog", name: "", breed: "", sex: "female", birthDate: "", weight: "" },
  });

  const submit = handleSubmit(onSubmit);

  return (
    <View style={styles.form}>
      {/* Foto */}
      <View style={styles.photoWrap}>
        <View style={styles.photo}>
          <Feather name="camera" size={22} color={colors.textMuted} />
          <Text style={styles.photoText}>{t("pets.new.photo").toUpperCase()}</Text>
        </View>
        <View style={styles.photoBadge}>
          <Feather name="plus" size={16} color={colors.accentText} />
        </View>
      </View>

      {/* Especie */}
      <Controller
        control={control}
        name="species"
        render={({ field }) => (
          <Field label={t("pets.new.fields.species")} colors={colors}>
            <Segmented
              colors={colors}
              value={field.value}
              onChange={field.onChange}
              options={[
                {
                  value: "dog",
                  label: t("pets.species.dog"),
                  icon: <MaterialCommunityIcons name="dog" size={18} />,
                },
                {
                  value: "cat",
                  label: t("pets.species.cat"),
                  icon: <MaterialCommunityIcons name="cat" size={18} />,
                },
              ]}
            />
          </Field>
        )}
      />

      {/* Nombre */}
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Input
            label={t("pets.new.fields.name.label")}
            indexLabel="01"
            leftIcon="tag"
            placeholder={t("pets.new.fields.name.placeholder")}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={errors.name?.message}
            autoCapitalize="words"
            returnKeyType="next"
          />
        )}
      />

      {/* Raza */}
      <Controller
        control={control}
        name="breed"
        render={({ field }) => (
          <Input
            label={t("pets.new.fields.breed.label")}
            indexLabel="02"
            placeholder={t("pets.new.fields.breed.placeholder")}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={errors.breed?.message}
            autoCapitalize="words"
            returnKeyType="next"
          />
        )}
      />

      {/* Sexo */}
      <Controller
        control={control}
        name="sex"
        render={({ field }) => (
          <Field label={t("pets.new.fields.sex")} colors={colors}>
            <Segmented
              colors={colors}
              value={field.value}
              onChange={field.onChange}
              options={[
                { value: "female", label: t("pets.new.fields.female") },
                { value: "male", label: t("pets.new.fields.male") },
              ]}
            />
          </Field>
        )}
      />

      {/* Nacimiento + Peso */}
      <View style={styles.row}>
        <Controller
          control={control}
          name="birthDate"
          render={({ field }) => (
            <View style={styles.rowItem}>
              <Input
                label={t("pets.new.fields.birthDate")}
                indexLabel="03"
                leftIcon="calendar"
                placeholder="dd/mm/yyyy"
                value={field.value}
                onChangeText={field.onChange}
                keyboardType="numbers-and-punctuation"
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="weight"
          render={({ field }) => (
            <View style={styles.rowItem}>
              <Input
                label={t("pets.new.fields.weight")}
                indexLabel="04"
                leftIcon="briefcase"
                placeholder="0.0"
                rightText="KG"
                value={field.value}
                onChangeText={field.onChange}
                keyboardType="decimal-pad"
              />
            </View>
          )}
        />
      </View>

      <Button
        label={t("pets.new.submit")}
        leftIcon="check"
        loading={isSubmitting}
        onPress={() => submit()}
      />
      <Button label={t("pets.new.cancel")} variant="outline" onPress={onCancel} />
    </View>
  );
}

function Field({
  label,
  colors,
  children,
}: {
  label: string;
  colors: ThemeColors;
  children: ReactNode;
}) {
  return (
    <View style={{ gap: 10 }}>
      <Text
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          letterSpacing: 2,
          color: colors.label,
          paddingHorizontal: 2,
        }}
      >
        {label.toUpperCase()}
      </Text>
      {children}
    </View>
  );
}

type SegmentedOption<T extends string> = { value: T; label: string; icon?: ReactNode };

function Segmented<T extends string>({
  colors,
  value,
  onChange,
  options,
}: {
  colors: ThemeColors;
  value: T;
  onChange: (value: T) => void;
  options: SegmentedOption<T>[];
}) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.segment}>
      {options.map((opt) => {
        const active = value === opt.value;
        const fg = active ? colors.accentText : colors.textMuted;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            accessibilityRole="button"
            style={[
              styles.segmentItem,
              { borderColor: colors.border },
              active && { backgroundColor: colors.accent, borderColor: colors.accent },
            ]}
          >
            {opt.icon ? <View style={{ marginRight: 8 }}>{withColor(opt.icon, fg)}</View> : null}
            <Text style={[styles.segmentText, { color: fg }]}>{opt.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// Inyecta el color al icono pasado como elemento.
function withColor(icon: ReactNode, color: string): ReactNode {
  return isValidElement<{ color?: string }>(icon) ? cloneElement(icon, { color }) : icon;
}

const makeStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    form: {
      gap: 16,
    },
    photoWrap: {
      alignSelf: "center",
      marginVertical: 2,
    },
    photo: {
      width: 124,
      height: 124,
      borderRadius: 100,
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: colors.border,
      backgroundColor: colors.inputBg,
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    },
    photoText: {
      fontFamily: fonts.mono,
      fontSize: 11,
      letterSpacing: 2,
      color: colors.textMuted,
    },
    photoBadge: {
      position: "absolute",
      right: 2,
      bottom: 6,
      width: 36,
      height: 36,
      borderRadius: 100,
      backgroundColor: colors.accent,
      alignItems: "center",
      justifyContent: "center",
    },
    segment: {
      flexDirection: "row",
      gap: 12,
    },
    segmentItem: {
      flex: 1,
      flexDirection: "row",
      height: 48,
      borderRadius: 12,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    segmentText: {
      fontFamily: fonts.mono,
      fontSize: 13,
      letterSpacing: 1.5,
      fontWeight: "600",
    },
    row: {
      flexDirection: "row",
      gap: 14,
    },
    rowItem: {
      flex: 1,
    },
  });
