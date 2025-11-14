<script setup lang="ts">
interface Teacher {
  id: string
  name: string
  email: string
  subject: string
}

const props = defineProps<{ teacher: Teacher }>()

const store = useTeachersStore()
const router = useRouter()
const toast = useToast()

async function handleDelete() {
  if (!confirm(`Are you sure you want to delete ${props.teacher.name}?`)) return

  await store.deleteTeacher(props.teacher.id)

  toast.add({
    title: "Deleted",
    description: `${props.teacher.name} has been removed.`,
  })

  router.push('/teachers')
}
</script>

<template>
  <div>
    <h1>{{ teacher.name }}</h1>
    <p>{{ teacher.subject }}</p>
    <p>{{ teacher.email }}</p>

    <button>
      <NuxtLink :to="`/teachers/edit/${teacher.id}`">
        Edit
      </NuxtLink>
    </button>

    <button @click="handleDelete">
      Delete
    </button>
  </div>
</template>
