import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/user";

const STORAGE_KEY = "users";

export const loadUsers = async (): Promise<User[]> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.warn("Failed to load users:", e);
    return [];
  }
};

export const saveUsers = async (users: User[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.warn("Failed to save users:", e);
  }
};
