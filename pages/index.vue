<template>
  <div class="todo">
    <h2>Plan Your Day with To-Do Lists</h2>
    <div class="todo__task-list">
      <div class="todo__add" >
        <button class="btn todo__add-btn" @click="openModal" >Add new task</button>
      </div>
      <h3>Active tasks</h3>
      <div v-for="(task) in tasks" :key="task.id">
      <TaskCard
        :task="task"
        @delete-task="deleteTask"
        @edit-task="openEditModal(task)"
      />

    </div>

      <h3>Completed Task</h3>
      <!-- Тут будет задачи которые отмечены выполненными > -->
    </div>
    <AddTask
      v-if="isModalOpen"
      @close="closeModal"
      @add-task="addNewTask"
    />
    <EditTask
      v-if="isEditModalOpen"
      :task="selectedTask"
      @close="closeEditModal"
      @save-changes="saveTaskChanges"
      @delete-task="deleteTask"
    />


  </div>
</template>

<script setup lang="ts">
import AddTask from "~/components/AddTask.vue";
import TaskCard from "~/components/TaskCard.vue";
import { ref } from "vue";



const tasks = ref([
  {
    id: 1, 
    title: 'Задача 1', 
    description: 'Описание задачи 1', 
    expireDate: '2024-12-23',
    todos: [
      { id: 1, text: 'Подзадача 1.1', completed: false },
      { id: 2, text: 'Подзадача 1.2', completed: false },
      { id: 3, text: 'Подзадача 1.3', completed: false },
      { id: 4, text: 'Подзадача 1.4', completed: false },
      { id: 5, text: 'Подзадача 1.5', completed: false }
    ]
  },
  {
    id: 2, 
    title: 'Задача 2', 
    description: 'Описание задачи 2', 
    expireDate: '2024-12-23',
    todos: [
      { id: 1, text: 'Подзадача 2.1', completed: false }
    ]
  },
])

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const addNewTask = (newTask: { 
  id: number; 
  title: string; 
  description: string; 
  expireDate: string; 
  todos: { id: number; text: string; 
  completed: boolean }[] 
  }) => {
  tasks.value.push(newTask)
  console.log('Обновленный список задач:', tasks.value) 
}


const isEditModalOpen = ref(false)
type Task = {
  id: number;
  title: string;
  description: string;
  expireDate: string;
  todos: { id: number; text: string; completed: boolean }[];
};


const selectedTask = ref<Task | null>(null)


const openEditModal = (task: Task) => {
  selectedTask.value = { ...task }
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
  selectedTask.value = null
}

const saveTaskChanges = (updatedTask: Task) => {
  const taskIndex = tasks.value.findIndex((t) => t.id === updatedTask.id)
  if (taskIndex !== -1) {
    tasks.value[taskIndex] = updatedTask
  }
  closeEditModal()
}

const deleteTask = (taskId: number) => {
  const confirmation = window.confirm('Вы уверены, что хотите удалить эту задачу?')
  if (confirmation) {
    tasks.value = tasks.value.filter((task) => task.id !== taskId)
  } else {
    alert('Удаление отменено.')
  }
}

</script>

<style scoped lang="scss">
@use '~/assets/styles.scss' as *;

.todo {
  width: 100%;
  max-width: 960px;
  margin: auto;
  -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px; 
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px; 

  &__task-list {
    width: 100%;
    margin: auto;
  }

  &__add {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1.25rem; 

    &-btn {
      background-color: var(--btn-succsess);
      color: var(--text-white);
      padding: 0.625rem 1.5625rem; 
      border: none;
      border-radius: 0.25rem;
      margin-right: 1.25rem;
      cursor: pointer;
      -webkit-transition: background-color 0.3s ease; 
      transition: background-color 0.3s ease; 

      &:hover {
        background-color: var(--btn-succsess-hover);
      }
    }
    
  }

  h2 {
    margin: 1.25rem;
    font-size: 1.5rem;
  }

  h3 {
    margin: 1.25rem;
    font-size: 1.25rem; 
    margin-top: 1.25rem; 
  }

  @media (max-width: 768px) {
    .todo {
      max-width: 100%;
      padding: 0 1rem; 
    }

    &__add {
      flex-direction: column;
      align-items: center;
      margin-bottom: 1rem;
    }

    &__add-btn {
      padding: 0.5rem 1.25rem; 
    }

    h2 {
      font-size: 1.25rem;
    }

    h3 {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 1.125rem; 
    }

    h3 {
      font-size: 1rem; 
    }
  }
}

</style>
