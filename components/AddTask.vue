<template>
    <div class="add-task-dialog">
      <div class="add-task-dialog__content">
        <div class="add-task-dialog__header">
          <h2>Add new task</h2>
          <button @click="onClickCancel" class="add-task-dialog__close-btn">X</button>
        </div>
        <div class="add-task-dialog__body">
          <label for="title" class="add-task-dialog__label">Task title</label>
          <input type="text" id="title" class="add-task-dialog__input">
          <label for="description" class="add-task-dialog__label">Description</label>
          <input type="text" id="description" class="add-task-dialog__input">
          <label for="date" class="add-task-dialog__label">Expire date</label>
          <input type="date" id="date" class="add-task-dialog__input">
          <div class="add-task-dialog__action" @click="closeDialog">
            <button class="btn add-task-dialog__submit-btn">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  const emit = defineEmits(["close"])
  
  function closeDialog() {
    emit("close", true)
  }
  
  function onClickCancel() {
    emit("close", true)
  }
  </script>
  
  <style  lang="scss">
@import '~/assets/styles.scss';

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
    max-height: 400px;
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

  &__close-btn {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 1.5rem; 
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
    padding: 4px 0;
    width: 100%;
    height: 2rem; 
    border: none;
    border-radius: 4px;
    background-color: var(--input-bg);
    outline: none;
    margin-bottom: 1rem; 
    font-size: 1rem; 
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease; 
  }

  &__action {
    display: flex;
    justify-content: flex-end;
  }

  &__submit-btn {
    background: var(--btn-succsess);
    color: var(--text-white);
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background-color: var(--btn-succsess-hover);
    }

    -webkit-transition: background-color 0.3s ease;
    transition: background-color 0.3s ease;
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
  