<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import {useToast} from '#imports'
// ✅ Access the Nuxt toast composable safely
const toast = useToast()

// Get route and router
const route = useRoute()
const router = useRouter()
const id = route.params.id

// Fetch teacher data
const { data: teacher, pending, error } = await useFetch(`http://localhost:3001/teachers/${id}`)

// 🗑 Delete handler
async function deleteTeacher() {
  if (!confirm(`Are you sure you want to delete ${teacher.value?.name}?`)) return

  try {
    await $fetch(`http://localhost:3001/teachers/${id}`, { method: 'DELETE' })

    toast.add({
      title: 'Teacher Deleted',
      description: `${teacher.value?.name} has been removed.`,
      color: 'error'
    })

    router.push('/teachers')
  } catch (err) {
    console.error('Error deleting teacher:', err)
    toast.add({
      title: 'Error',
      description: 'Failed to delete teacher. Check API connection.',
      color: 'error'
    })
  }
}

// ✏️ Edit handler — navigate to edit page
function editTeacher() {
  router.push(`/teachers/edit/${id}`)
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 space-y-4">
    <!-- Loading and Error States -->
    <div v-if="pending">Loading teacher data...</div>
    <div v-else-if="error">Error loading teacher profile.</div>

    <div v-else>
      <h2 class="text-2xl font-semibold">Teacher Profile: {{ teacher?.name }}</h2>
      <p>Email: {{ teacher?.email }}</p>
      <p>Subject: {{ teacher?.subject }}</p>

      <!-- Action Buttons -->
      <div class="flex gap-3 pt-6">
        <UButton color="blue" @click="editTeacher">
          ✏️ Edit
        </UButton>

        <UButton color="red" @click="deleteTeacher">
          🗑 Delete
        </UButton>
      </div>
    </div>
  </div>
</template>
