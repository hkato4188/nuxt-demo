<script setup lang="ts">
    const { id } = useRoute().params
    const { data: teacher } = await useFetch(`http://localhost:3001/teachers/${id}`)
</script>

<template>
    <div>
        <h2>Teacher Profile: {{ teacher.name }}</h2>
        <p>Email: {{ teacher.email }}</p>
        <p>Subject: {{ teacher.subject }}</p>
        </div>
</template>