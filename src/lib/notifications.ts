import Constants, { ExecutionEnvironment } from "expo-constants";

/**
 * En Expo Go (SDK 53+) `expo-notifications` ya no soporta push y su módulo
 * nativo lanza al inicializarse en Android. Por eso solo lo cargamos en dev
 * builds / standalone, y en Expo Go las funciones degradan a `false`.
 * Las APIs reales requieren un development build (https://docs.expo.dev/develop/development-builds/introduction/).
 */
const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

/** Devuelve true si el permiso de notificaciones ya está concedido. */
export async function getPushPermissionGranted(): Promise<boolean> {
  if (isExpoGo) return false;
  try {
    const Notifications = await import("expo-notifications");
    const { status } = await Notifications.getPermissionsAsync();
    return status === "granted";
  } catch {
    return false;
  }
}

/** Pide el permiso de notificaciones push. Devuelve true si quedó concedido. */
export async function requestPushPermission(): Promise<boolean> {
  if (isExpoGo) return false;
  try {
    const Notifications = await import("expo-notifications");
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  } catch {
    return false;
  }
}
