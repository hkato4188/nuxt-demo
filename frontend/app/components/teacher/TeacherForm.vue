<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const router = useRouter()
const toast = useToast()

const props = defineProps<{
  submitText: string
  loading?: boolean
  initial: {
    name: string
    subject: string
    email: string
    classIds: number[]
  }
}>()

const emit = defineEmits<{
  submit: [payload: Schema]
}>()

const schema = v.object({
  name: v.pipe(v.string(), v.minLength(2, 'Name must be at least 2 characters')),
  subject: v.pipe(v.string(), v.minLength(2, 'Subject must be at least 2 characters')),
  email: v.pipe(v.string(), v.email('Invalid email')),
  classIds: v.array(v.number(), 'Class IDs must be numbers')
})
type Schema = v.InferOutput<typeof schema>

const state = reactive<Schema>({
  name: props.initial.name,
  subject: props.initial.subject,
  email: props.initial.email,
  classIds: [...props.initial.classIds]
})

// Comma-separated input, synced to classIds array
const classIdsText = ref(props.initial.classIds.join(', '))
watch(classIdsText, (val) => {
  state.classIds = val
    .split(',')
    .map(id => Number(id.trim()))
    .filter(n => !Number.isNaN(n))
})

// Emit validated payload
async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const newTeacher = {
      id: String(Math.floor(Math.random() * 1000)),
      ...event.data
    }

    const response = await $fetch('http://localhost:3001/teachers', {
      method: 'POST',
      body: newTeacher
    })

    toast.add({
      title: 'Teacher Created',
      description: `Added ${response.name} (${response.subject})`,
      color: 'success'
    })

    
  } catch (error) {
    console.error('Error creating teacher:', error)
    toast.add({
      title: 'Error',
      description: 'Could not create teacher. Check your API connection.',
      color: 'error'
    })
  }
  await router.push('/teachers') // redirect after success
}
</script>
<template>
  <UForm
    :schema="schema"
    :state="state"
    :disabled="loading"
    class="space-y-4"
    @submit="onSubmit"
    @error="onError"
  >
    <UFormField label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormField>

    <UFormField label="Subject" name="subject">
      <UInput v-model="state.subject" />
    </UFormField>

    <UFormField label="Email" name="email">
      <UInput v-model="state.email" type="email" />
    </UFormField>

    <UFormField label="Class IDs (comma-separated)" name="classIds">
      <UInput v-model="classIdsText" />
    </UFormField>

    <UButton :loading="loading" type="submit">
      {{ submitText }}
    </UButton>
  </UForm>
</template>
