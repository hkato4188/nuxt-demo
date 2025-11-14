<script setup lang="ts">
import * as v from "valibot"
import { type FormSubmitEvent } from "@nuxt/ui"

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

const state = reactive({ ...props.initial })

const schema = v.object({
  name: v.pipe(v.string(), v.minLength(2)),
  subject: v.pipe(v.string(), v.minLength(2)),
  email: v.pipe(v.string(), v.email()),
  classIds: v.array(v.number())
})

const classIdsText = ref(props.initial.classIds.join(", "))

watch(classIdsText, val => {
  state.classIds = val
    .split(",")
    .map(n => Number(n.trim()))
    .filter(n => !isNaN(n))
})

function onSubmit(event: FormSubmitEvent<any>) {
  emit("submit", event.data)
}
</script>

<template>
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

    <UFormField label="Class IDs" name="classIds">
      <UInput v-model="classIdsText" />
    </UFormField>

    <UButton :loading="loading" type="submit" color="blue">
      {{ submitText }}
    </UButton>
  </UForm>
</template>
