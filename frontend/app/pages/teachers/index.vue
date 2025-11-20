<script setup lang="ts">
const store = useTeachersStore()
await store.fetchTeachers()
</script>

<template>
  <UContainer>
    <div>
      <h1>Welcome to the Teachers page:</h1>

      <NuxtLink to="/teachers/new">
        <UButton>Create Teacher</UButton>
      </NuxtLink>
    </div>
    
    <div v-for="t in store.teachers">
      <TeacherCard :key="t.id" :teacher="t"/>
    </div>
  </UContainer>
</template>
