<template>
    <div class="modal">
      <h2>Добавить новую задачу</h2>
      <div>
        <label>Название:</label>
        <input v-model="title" type="text" placeholder="Название задачи" />
      </div>
      <div>
        <label>Описание:</label>
        <input v-model="description" type="text" placeholder="Описание задачи" />
      </div>
      <button @click="submitTask">Добавить задачу</button>
      <button @click="close">Закрыть</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Импортируем defineEmits для работы с событиями
  const emit = defineEmits()
  
  // Локальные состояния для формы
  const title = ref('')
  const description = ref('')
  
  const submitTask = () => {
    if (title.value && description.value) {
      const newTask = {
        id: Date.now(), // уникальный id
        title: title.value,
        description: description.value
      }
      // Передаем новую задачу родительскому компоненту
      emit('add-task', newTask)
      close() // Закрываем модальное окно
    } else {
      alert("Пожалуйста, заполните все поля")
    }
  }
  
  const close = () => {
    // Закрываем модальное окно
    emit('close')
    // Очищаем поля ввода
    title.value = ''
    description.value = ''
  }
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 1px solid black;
    z-index: 10;
  }
  </style>
  