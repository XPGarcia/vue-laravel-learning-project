
import PageComponent from '../components/PageComponent.vue';

<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <div class="text-3xl font-bold tracking-tight text-gray-900">{{ model.id ? model.title : 'Create survey' }}</div>
        <router-link
          :to="{ name: 'SurveyCreate' }"
          class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 -mt-0.5 mr-1 inline-block">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Add new Survey</span>
        </router-link>
      </div>
    </template>
    <form @submit.prevent="saveSurvey">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <!-- image -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div class="mt-1 flex items-center">
              <img
                v-if="model.image"
                :src="model.image"
                :alt="model.title"
                class="w-64 h-48 object-cover"
              />
              <span class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[80%] h-[80%] text-gray-300">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </span>
              <button
                class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-sm shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <input type="file" class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer">
                <span>Change</span>
              </button>
            </div>
          </div>
          <!-- title -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              v-model="model.title"
              autocomplete="survey_title"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </form>
  </PageComponent>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageComponent from '../components/PageComponent.vue';
import { useRoute } from 'vue-router';
import { useSurveyStore } from '../store';
import { Survey } from '../types';

const route = useRoute();
const surveyStore = useSurveyStore();

const model = ref<Survey>({
  title: "",
  status: false,
  image: "",
  questions: []
});

if (route.params.id) {
  const id = route.params.id as string;
  const survey = surveyStore.getSurvey(parseInt(id));
  if (survey) model.value = survey;
}

function saveSurvey() {
  // implement save survey
}

</script>