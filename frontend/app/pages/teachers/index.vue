<script setup lang="ts">
const store = useTeachersStore()
await store.fetchTeachers()
</script>

<template>
  <UContainer>
    <div class="flex justify-between items-center mb-4">
      <h1>Welcome to the Teachers page:</h1>

      <NuxtLink to="/teachers/new">
        <UButton>Create Teacher</UButton>
      </NuxtLink>
    </div>

    <div>
      <TeacherCard
        v-for="t in store.teachers"
        :key="t.id"
        :teacher="t"
      />
    </div>
  </UContainer>
</template>
