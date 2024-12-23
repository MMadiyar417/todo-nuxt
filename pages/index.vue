<template>
  <div class="todo">
    <h2>Plan Your Day with To-Do Lists</h2>
    <div class="todo__task-list">
      <div class="todo__add">
        <button class="btn todo__add-btn" @click="openModal">Add new task</button>
      </div>
      <h3>Active tasks</h3>
      <div v-for="task in tasksStore.tasks" :key="task.id">
        <TaskCard
          :task="task"
          @delete-task="deleteTask"
          @edit-task="openEditModal(task)"
        />
      </div>

      <h3>Completed tasks</h3>
      <div v-for="task in tasksStore.completedTasks" :key="task.id">
        <TaskCard
          :task="task"
          @delete-task="deleteTask"
          @edit-task="openEditModal(task)"
        />
      </div>
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
      @mark-completed="markTaskAsCompleted"  
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTasksStore } from '~/stores/tasks'
import AddTask from '~/components/AddTask.vue'
import TaskCard from '~/components/TaskCard.vue'
import EditTask from '~/components/EditTask.vue'

const tasksStore = useTasksStore()

const isModalOpen = ref(false)
const isEditModalOpen = ref(false)
const selectedTask = ref(null)

onMounted(() => {
  tasksStore.initializeTasks()
})

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const addNewTask = (newTask: { id: number; title: string; description: string; expireDate: string; todos: { id: number; text: string; completed: boolean }[] }) => {
  tasksStore.addTask(newTask)
}

const openEditModal = (task: any) => {
  selectedTask.value = { ...task }
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
  selectedTask.value = null
}

const saveTaskChanges = (updatedTask: any) => {
  tasksStore.updateTask(updatedTask)
  closeEditModal()
}

const deleteTask = (taskId: number) => {
  tasksStore.deleteTask(taskId)
}

const markTaskAsCompleted = (taskId: number) => {
  tasksStore.markTaskAsCompleted(taskId)
  closeEditModal()  
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
