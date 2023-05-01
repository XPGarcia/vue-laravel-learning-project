import { defineStore } from "pinia";
import { ref } from "vue";

interface LoaderState {
  isLoading: boolean;
}

const initialState: LoaderState = {
  isLoading: false,
};

export const useLoaderStore = defineStore("loader", () => {
  const isLoading = ref(initialState.isLoading);

  function setIsLoading(newValue: boolean) {
    isLoading.value = newValue;
  }

  return { isLoading, setIsLoading };
});
