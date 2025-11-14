<script setup lang="ts">
    const store = useTeachersStore()
    await store.fetchTeachers()
</script>

<template>
    <ULink :to="`http://localhost:3000/teachers/new`">Add New Teacher</ULink>
    <div v-for="teacher in store.teachers" :key="teacher.id">
        <TeacherCard :teacher="teacher"/>
    </div>
</template>