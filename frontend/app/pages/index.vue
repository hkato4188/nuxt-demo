<script setup lang="ts">
const counter = useState('counter', () => Math.round(Math.random() * 1000))
const counterTwo = useState('counterTwo', () => Math.round(Math.random() * 1000))
</script>

<template>
    <h1>This is the Index home / route, welcome to the page!</h1>
  <div>
    Counter: {{ counter }}
    <button @click="counter++">
      +
    </button>
    <button @click="counter--">
      -
    </button>
  </div>
  <div>
    Counter: {{ counterTwo }}
    <button @click="counterTwo++">
      +
    </button>
    <button @click="counterTwo--">
      -
    </button>
  </div>
</template>
