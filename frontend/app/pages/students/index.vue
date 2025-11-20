<script setup lang="ts">
const { apiBase } = useRuntimeConfig().public
const { data, pending, error } = await useFetch(`http://localhost:3001/students`)
</script>

<template>
  <div>
    <div v-if="pending">Loading students…</div>
    <div v-else-if="error">Could not load students.</div>
    <StudentList v-else :studentList="data" />
  </div>
</template>