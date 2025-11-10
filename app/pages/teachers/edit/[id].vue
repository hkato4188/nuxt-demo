<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const id = route.params.id as string

// reactive state for the form
const state = reactive({
  name: '',
  subject: '',
  email: '',
  classIds: [] as number[]
})

// string field for classIds text input
const classIdsInput = ref('')
const loading = ref(true)
const errorMsg = ref('')
const isSubmitting = ref(false)

// ✅ fetch teacher client-side after mount
onMounted(async () => {
  try {
    const res = await $fetch(`http://localhost:3001/teachers/${id}`)
    state.name = res.name
    state.subject = res.subject
    state.email = res.email
    state.classIds = res.classIds || []
    classIdsInput.value = state.classIds.join(', ')
  } catch (err) {
    console.error(err)
    errorMsg.value = 'Could not load teacher data.'
  } finally {
    loading.value = false
  }
})

// ✅ valibot validation schema
const schema = v.object({
  name: v.pipe(v.string(), v.minLength(2, 'Name must be at least 2 characters')),
  subject: v.pipe(v.string(), v.minLength(2, 'Subject must be at least 2 characters')),
  email: v.pipe(v.string(), v.email('Invalid email')),
  classIds: v.array(v.number(), 'Class IDs must be numbers')
})
type Schema = v.InferOutput<typeof schema>

// ✅ PUT on submit
async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    isSubmitting.value = true
    const updated = { id, ...event.data }

    await $fetch(`http://localhost:3001/teachers/${id}`, {
      method: 'PUT',
      body: updated
    })

    toast.add({
      title: 'Teacher Updated',
      description: `${updated.name} was saved successfully.`,
      color: 'success'
    })

    router.push(`/teachers/${id}`)
  } catch (err) {
    console.error(err)
    toast.add({
      title: 'Error',
      description: 'Failed to save changes.',
      color: 'error'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <UContainer class="max-w-md mx-auto py-10 space-y-6">
    <h2 class="text-2xl font-semibold">Edit Teacher</h2>

    <div v-if="loading">
      <ULoadingIcon /> Loading teacher details...
    </div>

    <div v-else-if="errorMsg">
      <UAlert color="red">{{ errorMsg }}</UAlert>
    </div>

    <div v-else>
      <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-4">
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
          <UInput
            v-model="classIdsInput"
            placeholder="e.g. 31, 32"
            @change="
              state.classIds = classIdsInput
                .split(',')
                .map(id => Number(id.trim()))
                .filter(id => !Number.isNaN(id))
            "
          />
        </UFormField>

        <div class="flex gap-3 pt-4 items-center">
          <UButton type="submit" color="blue" :loading="isSubmitting">
            {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
          </UButton>
          <UButton variant="ghost" @click="router.push(`/teachers/${id}`)">Cancel</UButton>
        </div>
      </UForm>
    </div>
  </UContainer>
</template>
