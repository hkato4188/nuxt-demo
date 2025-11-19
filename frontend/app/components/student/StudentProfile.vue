<script setup lang="ts">
    const { id } = useRoute().params
    const { data: student } = await useFetch(`http://localhost:3001/students/${id}`)
</script>

<template>
    <div>
        <h2>Student Profile: {{ student.firstName }} {{ student.lastName }}</h2>
        <p>Grade: {{ student.gradeLevel }}</p>
        <p>ID: {{ student.id }}</p>
        </div>
</template>