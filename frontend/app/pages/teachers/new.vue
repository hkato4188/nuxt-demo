<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'


const schema = v.object({
  name: v.pipe(v.string(), v.minLength(2, 'Name must be at least 2 characters')),
  subject: v.pipe(v.string(), v.minLength(2, 'Subject must be at least 2 characters')),
  email: v.pipe(v.string(), v.email('Invalid email')),
  classIds: v.array(v.number(), 'Class IDs must be numbers')
})


type Schema = v.InferOutput<typeof schema>


const state = reactive<Schema>({
  name: '',
  subject: '',
  email: '',
  classIds: []
})

const classIdsInput = ref('')

const toast = useToast()


async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const newTeacher = {
      id: String(Math.floor(Math.random() * 1000)), // temporary ID — backend normally does this
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

    console.log('✅ Teacher created:', response)

    
    state.name = ''
    state.subject = ''
    state.email = ''
    state.classIds = []
    classIdsInput.value = ''
  } catch (error) {
    
    console.error('Error creating teacher:', error)
    toast.add({
      title: 'Error',
      description: 'Could not create teacher. Check your API connection.',
      color: 'error'
    })
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-4 max-w-md mx-auto mt-8">
    <!-- Name -->
    <UFormField label="Name" name="name">
      <UInput v-model="state.name" placeholder="Enter teacher name" />
    </UFormField>

    <!-- Subject -->
    <UFormField label="Subject" name="subject">
      <UInput v-model="state.subject" placeholder="Enter subject (e.g., History)" />
    </UFormField>

    <!-- Email -->
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" type="email" placeholder="Enter email" />
    </UFormField>

    <!-- Class IDs -->
    <UFormField label="Class IDs (comma-separated)" name="classIds">
      <UInput
        v-model="classIdsInput"
        placeholder="e.g. 31, 32"
        @change="
          state.classIds = classIdsInput
            .split(',')
            .map(id => Number(id.trim()))
            .filter(Boolean)
        "
      />
    </UFormField>

    <!-- Submit -->
    <UButton type="submit" block>
      Create Teacher
    </UButton>
  </UForm>
</template>
