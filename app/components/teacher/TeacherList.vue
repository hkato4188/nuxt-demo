<script setup lang="ts">
    interface Teacher {
        id: string;
        name: string;
        email: string;
        subject: string;
    }
    const props = defineProps<{
        teacherList: Teacher[]; 
    }>()
</script>

<template>

    <ULink :to="`http://localhost:3000/teachers/new`">Add New Teacher</ULink>

    <div 
        v-for="teacher in props.teacherList" 
        :key="teacher.id"
    >
        <h1>{{ teacher.name }}</h1>
        <h3>{{ teacher.email }}</h3>
        <p>{{ teacher.subject }}</p>
         <ULink :to="`http://localhost:3000/teachers/${ teacher.id }`">Link</ULink>
    </div>
</template>