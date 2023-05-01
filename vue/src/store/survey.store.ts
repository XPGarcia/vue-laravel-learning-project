import { defineStore } from "pinia";
import { ref } from "vue";
import { Api, Pagination, Survey, SurveyResponse } from "../types";
import axios from "axios";
import { SurveyAdapter } from "../adapters";
import { useLoaderStore } from ".";

interface SurveyState {
  surveys: Survey[];
  currentSurvey: Survey;
  questionTypes: string[];
}

const initialState: SurveyState = {
  surveys: [],
  currentSurvey: {
    title: "",
    status: false,
    image: "",
    questions: [],
  },
  questionTypes: ["text", "select", "checkbox", "radio", "textarea"],
};

export const useSurveyStore = defineStore("survey", () => {
  const surveys = ref(initialState.surveys);
  const currentSurvey = ref(initialState.currentSurvey);
  const questionTypes = ref(initialState.questionTypes);

  const loaderStore = useLoaderStore();

  async function getSurveys() {
    loaderStore.setIsLoading(true);
    const response = await axios.get<Pagination<SurveyResponse>>(
      "/api/surveys"
    );

    surveys.value = SurveyAdapter.toDomains(response.data.data);
    loaderStore.setIsLoading(false);
  }

  async function getSurvey(surveyId: number) {
    loaderStore.setIsLoading(true);
    const response = await axios.get<Api<SurveyResponse>>(
      `/api/surveys/${surveyId}`
    );

    currentSurvey.value = SurveyAdapter.toDomain(response.data.data);
    loaderStore.setIsLoading(false);
  }

  async function createSurvey(survey: Survey) {
    loaderStore.setIsLoading(true);
    const response = await axios.post<Api<SurveyResponse>>(
      "/api/surveys",
      survey
    );

    currentSurvey.value = SurveyAdapter.toDomain(response.data.data);
    loaderStore.setIsLoading(false);
  }

  async function updateSurvey(survey: Survey) {
    loaderStore.setIsLoading(true);
    const response = await axios.put<Api<SurveyResponse>>(
      `/api/surveys/${survey.id}`,
      survey
    );

    currentSurvey.value = SurveyAdapter.toDomain(response.data.data);
    loaderStore.setIsLoading(false);
  }

  async function deleteSurvey(surveyId: number) {
    loaderStore.setIsLoading(true);
    await axios.delete(`/api/surveys/${surveyId}`);
    // await getSurveys();
    surveys.value = surveys.value.filter((survey) => survey.id !== surveyId);
    loaderStore.setIsLoading(false);
  }

  function clearCurrentSurvey() {
    currentSurvey.value = initialState.currentSurvey;
  }

  return {
    surveys,
    currentSurvey,
    questionTypes,
    getSurveys,
    getSurvey,
    createSurvey,
    updateSurvey,
    deleteSurvey,
    clearCurrentSurvey,
  };
});
