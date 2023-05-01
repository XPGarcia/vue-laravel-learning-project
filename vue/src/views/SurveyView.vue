<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ route.params.id ? currentSurvey.title : "Create a Survey" }}
        </h1>

        <div class="flex">
          <a
            :href="`/view/survey/${currentSurvey.slug}`"
            target="_blank"
            v-if="currentSurvey.slug"
            class="flex py-2 px-4 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            View Public link
          </a>
          <button
            v-if="route.params.id"
            type="button"
            @click="deleteSurvey()"
            class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 -mt-1 inline-block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            Delete Survey
          </button>
        </div>
      </div>
    </template>
    <div v-if="isLoading" class="flex justify-center">Loading...</div>
    <form v-else @submit.prevent="saveSurvey" class="animate-fade-in-down">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <!-- Survey Fields -->
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <!-- Image -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div class="mt-1 flex items-center">
              <img
                v-if="currentSurvey.image"
                :src="currentSurvey.image"
                :alt="currentSurvey.title"
                class="w-64 h-48 object-cover"
              />
            </div>
          </div>
          <!--/ Image -->

          <!-- Title -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700"
              >Title</label
            >
            <input
              type="text"
              name="title"
              id="title"
              v-model="currentSurvey.title"
              autocomplete="survey_title"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <!--/ Title -->

          <!-- Description -->
          <div>
            <label for="about" class="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div class="mt-1">
              <textarea
                id="description"
                name="description"
                rows="3"
                v-model="currentSurvey.description"
                autocomplete="survey_description"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Describe your survey"
              />
            </div>
          </div>
          <!-- Description -->

          <!-- Expire Date -->
          <div>
            <label
              for="expire_date"
              class="block text-sm font-medium text-gray-700"
              >Expire Date</label
            >
            <input
              type="date"
              name="expire_date"
              id="expire_date"
              :value="expireDate"
              @input="setExpireDate"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <!--/ Expire Date -->

          <!-- Status -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="status"
                name="status"
                type="checkbox"
                v-model="currentSurvey.status"
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="status" class="font-medium text-gray-700">
                Active
              </label>
            </div>
          </div>
          <!--/ Status -->
        </div>
        <!--/ Survey Fields -->

        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <h3 class="text-2xl font-semibold flex items-center justify-between">
            Questions

            <!-- Add new question -->
            <button
              type="button"
              @click="addQuestion()"
              class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Add Question
            </button>
            <!--/ Add new question -->
          </h3>
          <div v-if="!currentSurvey.questions.length" class="text-center text-gray-600">
            You don't have any questions created
          </div>
          <!-- <div v-for="(question, index) in currentSurvey.questions" :key="question.id">
            <QuestionEditor
              :question="question"
              :index="index"
              @change="questionChange"
              @addQuestion="addQuestion"
              @deleteQuestion="deleteQuestion"
            />
          </div> -->
        </div>

        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </PageComponent>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import PageComponent from '../components/PageComponent.vue';
import { useRoute, useRouter } from 'vue-router';
import { useLoaderStore, useSurveyStore } from '../store';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const surveyStore = useSurveyStore();
const loaderStore = useLoaderStore();

const { currentSurvey } = storeToRefs(surveyStore);
const { isLoading } = storeToRefs(loaderStore);

const expireDate = computed(() => {
  if (!currentSurvey.value.expire_date) return;
  const timestamp = currentSurvey.value.expire_date.getTime() - (currentSurvey.value.expire_date?.getTimezoneOffset()*60*1000);
  const date = new Date(timestamp);
  return date.toISOString().split('T')[0];
});

const setExpireDate = (e: Event) => {
  const date = (e.target as HTMLInputElement).valueAsDate;
  if (!date) {
    currentSurvey.value.expire_date = undefined;
    return;
  }

  const timestamp = date.getTime() - (date.getTimezoneOffset() * 60 * 1000);
  currentSurvey.value.expire_date = new Date(timestamp);
}

onMounted(async () => {
  surveyStore.clearCurrentSurvey();
  if (route.params.id) {
    const id = route.params.id as string;
    await surveyStore.getSurvey(parseInt(id));
  }
})

async function saveSurvey() {
  if (route.params.id) {
    await surveyStore.updateSurvey(currentSurvey.value);
  } else {
    await surveyStore.createSurvey(currentSurvey.value);
    router.push({ name: 'SurveyView', params: { id: currentSurvey.value.id } })
  }
}

async function deleteSurvey() {
  if (!currentSurvey.value.id) return;
  await surveyStore.deleteSurvey(currentSurvey.value.id);
  router.push({ name: 'Surveys' });
}

function addQuestion() {
  // implement add question
}

function questionChange() {
  // implement question change
}

function deleteQuestion() {
  // implement delete question
}

</script>