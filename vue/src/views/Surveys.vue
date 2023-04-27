<template>
  <PageComponent :title="title">
    Content goes here
  </PageComponent>
</template>

<script setup lang="ts">
import PageComponent from '../components/PageComponent.vue';

const title = "Surveys";

</script>