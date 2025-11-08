<template>
  <section class="class-homepage">
    <header>
      <h1>Date</h1>
      <h2>Welcome Students!</h2>
      <UIcon name="unjs:giget" class="size-5" />
    </header>

    <ClassHeader class="class-homepage__header">History</ClassHeader>
    <div class="student-grid">
      <StudentCard
        v-for="student in students"
        :key="student"
        class="studentCard"
      >
        {{ student }}
      </StudentCard>
    </div>
  </section>
</template>

<script setup lang="ts">
const students = [
  'Trevor Student',
  'Hiro Student',
  'Austin Student',
  'Reine Student',
  'Maya Student',
  'Leo Student',
  'Sofia Student',
  'Ethan Student',
  'Nora Student',
  'Kai Student',
  'Luna Student',
  'Miles Student'
];
</script>

<style scoped>
.class-homepage {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.student-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
</style>
