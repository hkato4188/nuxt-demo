<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string

const { data: teacher, pending, error } = await useTeacherData(id)
</script>

<template>
  <UContainer>
    <div v-if="pending">
      <ULoadingIcon /> Loading teacher…
    </div>

    <UAlert v-else-if="error">
      Error loading teacher.
    </UAlert>

    <TeacherProfile v-else :teacher="teacher" />
  </UContainer>
</template>
