
 <script setup lang="ts">
    const { data } = await useFetch('http://localhost:3001/teachers')
</script>

<template>
    <TeacherList :teacherList="data"/>
</template>