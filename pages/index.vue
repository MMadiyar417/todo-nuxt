<template>
  <div class="todo">
    <h2>Plan Your Day with To-Do Lists</h2>
    <div class="todo__task-list">
      <div class="todo__add" >
        <button class="btn todo__add-btn" @click="toggleDialog" >Add new task</button>
      </div>
      <h3>Active tasks</h3>
      <div v-for="(item, index) in [1, 2, 3, 4]" :key="index">
        <TaskCard />
      </div>

      <h3>Completed Task</h3>
      <div v-for="(item, index) in [1, 2, 3, 4]" :key="index">
        <TaskCard />
      </div>
    </div>
    <add-task v-if="showDialog" @close="toggleDialog" ></add-task>
  </div>
</template>

<script setup lang="ts">
import AddTask from "~/components/AddTask.vue";
import TaskCard from "~/components/TaskCard.vue";
import { ref } from "vue";

const showDialog = ref(false);

function toggleDialog() {
  console.log('clicked');  
  showDialog.value = !showDialog.value;
}
</script>

<style  lang="scss">
@import '~/assets/styles.scss';

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
      cursor: pointer;
      -webkit-transition: background-color 0.3s ease; 
      transition: background-color 0.3s ease; 

      &:hover {
        background-color: var(--btn-succsess-hover);
      }
    }
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
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
