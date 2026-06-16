import * as Notifications from "expo-notifications";

/** Devuelve true si el permiso de notificaciones ya está concedido. */
export async function getPushPermissionGranted(): Promise<boolean> {
  const { status } = await Notifications.getPermissionsAsync();
  return status === "granted";
}

/** Pide el permiso de notificaciones push. Devuelve true si quedó concedido. */
export async function requestPushPermission(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}
