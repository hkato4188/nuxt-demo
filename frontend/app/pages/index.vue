<script setup lang="ts">
const actions = [
  { label: 'Browse Teachers', to: '/teachers' },
  { label: 'Add a Teacher', to: '/teachers/new' },
  { label: 'View Students', to: '/students' }
]

const highlights = [
  {
    title: 'Teacher Records',
    description: 'Profiles, subjects, and contact details managed in one place.',
    to: '/teachers'
  },
  {
    title: 'Onboarding',
    description: 'Create new teacher records with validation-friendly forms.',
    to: '/teachers/new'
  },
  {
    title: 'Student Directory',
    description: 'Quickly jump to student profiles to check grades and IDs.',
    to: '/students'
  }
]

const support = [
  {
    title: 'Data source',
    description: 'Mock API runs on json-server (`npm run trev`) at port 3001.'
  },
  {
    title: 'Current update',
    description: 'Finish student and class routes.'
  },
  {
    title: 'Next steps',
    description: 'Persist data with MongoDB.'
  }
]
</script>

<template>
  <UContainer>
    <section>
      <h1>Teacher IT Hub</h1>
      <p>Manage teacher records, onboard new staff, and peek at students in one place.</p>

      <div>
        <NuxtLink
          v-for="action in actions"
          :key="action.label"
          :to="action.to"
        >
          <UButton>
            {{ action.label }}
          </UButton>
        </NuxtLink>
      </div>
    </section>

    <section>
      <h2>What you can do</h2>
      <div>
        <UCard
          v-for="item in highlights"
          :key="item.title"
        >
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <NuxtLink :to="item.to">
            <UButton size="xs">Open</UButton>
          </NuxtLink>
        </UCard>
      </div>
    </section>

    <section>
      <h2>Environment notes</h2>
      <UCard>
        <ul>
          <li v-for="note in support" :key="note.title">
            <strong>{{ note.title }}:</strong> {{ note.description }}
          </li>
        </ul>
      </UCard>
    </section>
  </UContainer>
</template>
