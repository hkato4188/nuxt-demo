
 <script setup lang="ts">
    const { data } = await useFetch('http://localhost:3001/students')
</script>

<template>
    <StudentList :studentList="data"/>
</template>