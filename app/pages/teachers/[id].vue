<script setup lang="ts">
const store = useTeachersStore()
const route = useRoute()
const id = route.params.id as string

async function loadTeacher() {
  const cached = store.getById(id)
  if (cached) return cached

  const fresh = await store.fetchTeacherById(id)
  // Always return an object (never undefined)
  return fresh ?? { id, name: "", subject: "", email: "", classIds: [] }
}

const { data: teacher, pending, error } = await useAsyncData(
  `teacher-${id}`,
  loadTeacher)
</script>


<template>
  <div v-if="store.loading">Loading...</div>
  
  <div v-else>
    <TeacherProfile :teacher="teacher"/>
  </div>
</template>
