<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const toast = useToast()
const store = useTeachersStore()

const id = route.params.id as string
const { data: teacher, pending, error } = await useTeacherData(id)

async function handleSubmit(data: any) {
  const updated = await store.updateTeacher(id, { id, ...data })

  toast.add({
    title: "Updated",
    description: `${updated.name} saved successfully.`,
    color: "success"
  })

  router.push('/teachers')
}
</script>

<template>
  <UContainer>
    <h2>Edit Teacher</h2>

    <!-- Loading -->
    <div v-if="pending">
      <ULoadingIcon /> Loading teacher…
    </div>

    <!-- Error -->
    <UAlert v-else-if="error">
      Could not load teacher.
    </UAlert>

    <!-- Form -->
    <TeacherForm
      v-else
      :initial="teacher"
      :loading="pending"
      submitText="Save Changes"
      @submit="handleSubmit"
    />
  </UContainer>
</template>
