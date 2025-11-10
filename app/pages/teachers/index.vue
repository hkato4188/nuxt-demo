
<script setup lang="ts">
    const {data} = await useAsyncData('teacher', ()=> $fetch('http://localhost:3001/teachers'))
    console.log(data.value)
</script>

<template>
    <h1>Index for teachers</h1>
</template>