<script setup lang="ts">
    const { data: teachers } = await useAsyncData('teachers', () => $fetch('http://localhost:3001/teachers/'))
</script>

<template>
    <h1>Individual teacher page</h1>
    <TeacherProfile/>
</template>