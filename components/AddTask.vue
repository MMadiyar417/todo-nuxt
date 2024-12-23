<template>
  <div class="add-task-dialog">
    <div class="add-task-dialog__content">
      <div class="add-task-dialog__header">
        <h2>Add new task</h2>
      </div>
      <div class="add-task-dialog__body">
        <label for="title" class="add-task-dialog__label">Task title</label>
        <input 
          type="text" 
          id="title" 
          class="add-task-dialog__input"
          v-model="title"
        />

        <div v-for="(todo, index) in todos" :key="index" class="add-task-dialog__todo">
          <label :for="'todo-' + index" class="add-task-dialog__label">Subtask {{ index + 1 }}</label>
          <input 
            type="text" 
            v-model="todo.text" 
            :id="'todo-' + index"
            class="add-task-dialog__input"
            placeholder="Subtask text"
          />
          <label>
            <input 
              type="checkbox" 
              v-model="todo.completed"
            />
            Completed
          </label>
          <button @click="removeTodo(index)" class="add-task-dialog__remove-btn">Remove</button>
        </div>

        <button @click="addTodo" class="add-task-dialog__add-btn">Add Subtask</button>

        <label for="date" class="add-task-dialog__label">Expire date</label>
        <input 
          type="date" 
          id="expireDate" 
          class="add-task-dialog__input"
          v-model="expireDate"
        />

        <div class="add-task-dialog__action">
          <button @click="close" class="add-task-dialog__close-btn">Cancel</button>
          <button @click="submitTask" class="btn add-task-dialog__submit-btn">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits()

const title = ref('')
const expireDate = ref('')
const todos = ref<{ text: string; completed: boolean }[]>([])

const addTodo = () => {
  todos.value.push({ text: '', completed: false })
}

const removeTodo = (index: number) => {
  todos.value.splice(index, 1)
}

const submitTask = () => {
  if (title.value && todos.value.length > 0) {
    const newTask = {
      id: Date.now(), 
      title: title.value,
      todos: todos.value,
      expireDate: expireDate.value
    }
    emit('add-task', newTask)
    close()
  } else {
    alert("Please fill all fields and add at least one subtask")
  }
}

const close = () => {
  emit('close')
  title.value = ''
  expireDate.value = ''
  todos.value = []
}
</script>
  
  <style  lang="scss">
@use '~/assets/styles.scss' as *;

.add-task-dialog {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  overflow: auto;
  -webkit-transition: background-color 0.3s ease; 
  transition: background-color 0.3s ease; 

  &__content {
    background-color: var(--text-white);
    padding: 20px;
    max-width: 400px;
    border-radius: 4px;
    margin: auto;
    margin-top: 150px;
    width: 90%; 
    height: auto; 
    -webkit-box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 6px; 
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 6px; 

    @media (max-width: 768px) {
      max-width: 90%;
      margin-top: 80px; 
    }

    @media (max-width: 480px) {
      max-width: 95%;
      margin-top: 50px; 
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    font-size: 1.25rem; 
  }

  &__body {
    display: flex;
    flex-direction: column;
  }

  &__label {
    margin-bottom: 4px;
    font-size: 1rem; 
  }

  &__input {
    height: 2rem; 
    border: none;
    border-radius: 4px;
    background-color: var(--input-bg);
    outline: none;
    margin-bottom: 1rem; 
    font-size: 1rem; 
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;     
    font-family: 'Nunito', sans-serif;
    width: 100%;
    padding: 0.5rem;
    padding-left: 0;
    text-indent: 0.25rem;
    margin: 0.5rem 0;
    
  }
  &__remove-btn {
    background-color: var(--btn-cancel);
    padding: 0.3125rem;
    padding: 0.18rem 0.25rem;
  }
  &__add-btn {
    background: var(--btn-succsess);
    padding: 0.3125rem 0.625rem;
    margin: 0.6rem;
    
    &:hover {
      background-color: var(--btn-succsess-hover);
    }
  }

  &__action {
    display: flex;
    justify-content: space-between;
  }

  &__submit-btn {
    background: var(--btn-succsess);
    padding: 0.625rem 1.25rem;
    
    &:hover {
      background-color: var(--btn-succsess-hover);
    }

    -webkit-transition: background-color 0.3s ease;
    transition: background-color 0.3s ease;
  }

  &__close-btn {
    background: var(--btn-cancel);
    padding: 0.625rem 1.25rem;

    &:hover {
      background-color: var(--btn-cancel-hover);
    }
  }

  @media (max-width: 768px) {
    &__submit-btn {
      width: 100%; 
      padding: 0.75rem 0;
      font-size: 1.1rem;
    }
  }
}

.add-task-dialog__add-todo-btn {
  background-color: green;
  padding: 5px;
}

.add-task-dialog__action {
  display: flex;
  justify-content: space-between;
}



  </style>
  