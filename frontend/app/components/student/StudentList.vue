<script setup lang="ts">
    interface Student {
        id: string;
        firstName: string;
        lastName: string;
        gradeLevel: number;
    }
    const props = defineProps<{
        studentList: Student[]; 
    }>()
</script>

<template>
    <div 
        v-for="student in props.studentList" 
        :key="student.id"
    >
        <h1>{{ student.firstName }} {{ student.lastName }}</h1>
        <h3>Grade: {{ student.gradeLevel }}</h3>
        <p>{{ student.id }}</p>
         <ULink :to="`http://localhost:3000/students/${ student.id }`">Link</ULink>
    </div>
</template>