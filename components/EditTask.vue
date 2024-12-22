<template>
  <div class="add-task-dialog">
    <div class="add-task-dialog__content">
      <div class="add-task-dialog__header">
        <h2>Edit task</h2>
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
          <button @click="submitChanges" class="btn add-task-dialog__submit-btn">Submit</button>
        </div>

        <button @click="deleteTask" class="add-task-dialog__delete-btn">Delete Task</button>

        <div class="add-task-dialog__action">
          <button @click="resetChanges" class="btn add-task-dialog__reset-btn">Reset Changes</button>
          <button @click="repeatChanges" class="btn add-task-dialog__repeat-btn">Repeat Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  task: {
    type: Object as PropType<{
      id: number;
      title: string;
      expireDate: string;
      todos: { text: string; completed: boolean }[];
    }>,
    required: true,
  },
});

const emit = defineEmits();

const title = ref<string>(props.task?.title || '');
const expireDate = ref<string>(props.task?.expireDate || '');
const todos = ref<Array<{ text: string; completed: boolean }>>(props.task?.todos || []);

const originalTask = { 
  title: props.task?.title,
  expireDate: props.task?.expireDate,
  todos: JSON.parse(JSON.stringify(props.task?.todos)) 
};

const lastValidTask = ref<{ title: string; expireDate: string; todos: { text: string; completed: boolean }[] } | null>(null);

const deleteTask = () => {
  emit('delete-task', props.task.id);
  emit('close'); 
};

const resetChanges = () => {
  lastValidTask.value = {
    title: title.value,
    expireDate: expireDate.value,
    todos: JSON.parse(JSON.stringify(todos.value)),
  };

  title.value = originalTask.title;
  expireDate.value = originalTask.expireDate;
  todos.value = JSON.parse(JSON.stringify(originalTask.todos)); 
};

const repeatChanges = () => {
  if (lastValidTask.value) {
    title.value = lastValidTask.value.title;
    expireDate.value = lastValidTask.value.expireDate;
    todos.value = JSON.parse(JSON.stringify(lastValidTask.value.todos)); 
  } else {
    alert('No changes to repeat.');
  }
};

const addTodo = () => {
  todos.value.push({ text: '', completed: false });
};

const removeTodo = (index: number) => {
  todos.value.splice(index, 1);
};

const submitChanges = () => {
  if (title.value && todos.value.length > 0) {
    const updatedTask = {
      id: props.task.id,
      title: title.value,
      todos: todos.value,
      expireDate: expireDate.value,
    };
    lastValidTask.value = { title: title.value, expireDate: expireDate.value, todos: todos.value }; 
    emit('save-changes', updatedTask);
    emit('close');
  } else {
    alert('You need to fill out all fields and add at least one subtask.');
  }
};

const close = () => {
  const confirmation = window.confirm('Are you sure  to cancel ?');
  if (confirmation) {
    emit('close');
  }
};
</script>


<style scoped  lang="scss">
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
    padding: 5px;
    padding: 0.18rem 0.25rem;
    border-radius: 4px;
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
    padding: 10px 20px;    
    &:hover {
      background-color: var(--btn-succsess-hover);
    }

    -webkit-transition: background-color 0.3s ease;
    transition: background-color 0.3s ease;
  }
  &__close-btn {
    background: #828282;
    padding: 0.625rem 1.25rem;
    &:hover {
      background-color: var(--btn-cancel-hover);
    }
  }
  &__delete-btn {
    background: var(--btn-cancel);
    padding: 0.625rem 1.25rem;
    margin: 1rem 0;
    &:hover {
      background-color: var(--btn-cancel-hover);
    }
  }  
  &__reset-btn{
    background: #b1a132;
    &:hover {
      background-color: #d8cb73;
    }

  }
  &__repeat-btn{
    background: #b65a21;
    &:hover {
      background-color: #d38351;
    }

  }

  @media (max-width: 768px) {
    &__submit-btn {
      width: 100%; 
      padding: 12px 0;
      font-size: 1.1rem;
    }
  }
}

  </style>
  