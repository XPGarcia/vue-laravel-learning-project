import { defineStore } from "pinia";
import { ref } from "vue";
import { Survey } from "../types";

interface SurveyState {
  surveys: Survey[];
}

const initialState: SurveyState = {
  surveys: [],
};

export const useSurveyStore = defineStore("survey", () => {
  const surveys = ref(initialState.surveys);

  function getSurvey(id: number) {
    return surveys.value.find((survey) => survey.id === id);
  }

  return { surveys, getSurvey };
});
