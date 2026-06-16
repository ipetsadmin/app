import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

/** Backend de bajo nivel: solo lee/escribe/borra strings crudos. */
type Backend = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

/**
 * Construye los verbos get/save/remove sobre un backend, serializando JSON
 * para trabajar siempre con datos formateados. Cualquier resultado es la data
 * pedida o `null` (también `null` si la operación falla).
 */
function createStorage(backend: Backend) {
  return {
    async get<T>(key: string): Promise<T | null> {
      try {
        const raw = await backend.getItem(key);
        return raw == null ? null : (JSON.parse(raw) as T);
      } catch {
        return null;
      }
    },

    async save<T>(key: string, value: T): Promise<T | null> {
      try {
        await backend.setItem(key, JSON.stringify(value));
        return value;
      } catch {
        return null;
      }
    },

    async remove(key: string): Promise<null> {
      try {
        await backend.removeItem(key);
      } catch {
        // ignoramos el error: el resultado siempre es null
      }
      return null;
    },
  };
}

/**
 * Punto único de storage.
 *
 * - `storage.Async`  → datos no sensibles (preferencias, cache, flags) vía AsyncStorage.
 * - `storage.Secure` → datos sensibles cifrados (tokens, credenciales) vía Keychain/Keystore.
 *   No disponible en web; solo strings, límite ~2KB por clave.
 *
 * @example
 * await storage.Secure.save("token", { access: "abc" });
 * const token = await storage.Secure.get<{ access: string }>("token"); // data | null
 * await storage.Async.remove("onboarding-seen");
 */
export const storage = {
  Async: createStorage({
    getItem: (key) => AsyncStorage.getItem(key),
    setItem: (key, value) => AsyncStorage.setItem(key, value),
    removeItem: (key) => AsyncStorage.removeItem(key),
  }),

  Secure: createStorage({
    getItem: (key) => SecureStore.getItemAsync(key),
    setItem: (key, value) => SecureStore.setItemAsync(key, value),
    removeItem: (key) => SecureStore.deleteItemAsync(key),
  }),
};
