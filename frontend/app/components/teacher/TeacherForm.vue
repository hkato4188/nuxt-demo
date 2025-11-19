<script setup lang="ts">
import * as v from "valibot"
import type { FormSubmitEvent } from "@nuxt/ui"

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
  submit: [payload: any]
}>()

// Minimal reactive form state
const state = reactive({
  name: props.initial.name,
  subject: props.initial.subject,
  email: props.initial.email,
  classIds: [...props.initial.classIds]
})

// Separate text field for the comma-separated input
const classIdsText = ref(props.initial.classIds.join(", "))

// Keep state.classIds in sync with the text input
watch(classIdsText, (val) => {
  state.classIds = val
    .split(",")
    .map((n) => Number(n.trim()))
    .filter((n) => !Number.isNaN(n))
})

// Validation schema uses state
const schema = v.object({
  name: v.pipe(v.string(), v.minLength(2)),
  subject: v.pipe(v.string(), v.minLength(2)),
  email: v.pipe(v.string(), v.email()),
  classIds: v.array(v.number())
})

function onSubmit(event: FormSubmitEvent<any>) {
  // event.data is already the validated version of `state`
  emit("submit", event.data)
}
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormField label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormField>

    <UFormField label="Subject" name="subject">
      <UInput v-model="state.subject" />
    </UFormField>

    <UFormField label="Email" name="email">
      <UInput v-model="state.email" type="email" />
    </UFormField>

    <UFormField label="Class IDs" name="classIds">
      <UInput v-model="classIdsText" />
    </UFormField>

    <UButton :loading="loading" type="submit">
      {{ submitText }}
    </UButton>
  </UForm>
</template>
