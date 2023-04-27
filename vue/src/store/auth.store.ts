import { defineStore } from "pinia";
import { ref } from "vue";
import { LoginCredentials, RegisterUser, User, UserResponse } from "../types";
import axios from "axios";

const LOCAL_STORAGE_AUTH = "auth";

interface AuthState {
  user: User;
  authenticated: boolean;
}

const initialState = (): AuthState => {
  const authRaw = localStorage.getItem(LOCAL_STORAGE_AUTH);
  if (!authRaw) {
    return {
      user: {
        id: 0,
        name: "",
        email: "",
      },
      authenticated: false,
    };
  }
  const auth = JSON.parse(authRaw);
  return {
    user: auth.user,
    authenticated: auth.authenticated,
  };
};

export const useAuthStore = defineStore("auth", () => {
  const auth = ref<AuthState>(initialState());

  async function csrf() {
    await axios.get("/sanctum/csrf-cookie");
  }

  async function handleRegister(user: RegisterUser) {
    await csrf();

    await axios.post("/register", user);
  }

  async function handleLogin(credentials: LoginCredentials) {
    await csrf();

    await axios.post("/login", credentials);
    const user = await getUser();
    auth.value.user = user;
    auth.value.authenticated = true;
    localStorage.setItem(LOCAL_STORAGE_AUTH, JSON.stringify(auth.value));
  }

  async function handleLogout() {
    await axios.post("/logout");

    localStorage.removeItem(LOCAL_STORAGE_AUTH);
    auth.value = initialState();
  }

  async function getUser(): Promise<User> {
    await csrf();

    const response = await axios.get<UserResponse>("/api/user");
    return {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
    };
  }

  return {
    auth,
    handleLogout,
    handleRegister,
    handleLogin,
    getUser,
  };
});
