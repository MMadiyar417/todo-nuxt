<template>
  <div class="task-card">
    <div class="task-card__header">
      <div class="task-card__actions">
        <span>Edit</span>
        <span>Delete</span>
        <span>Complete</span>
      </div>
      <p class="task-card__title">This is title</p>
      <p class="task-card__info-text">Created on: 14th April 2024</p>
    </div>
    <div class="task-card__footer">
      <p class="task-card__description">Task description</p>
      <div class="task-card__meta">
        <p>Expiring date</p>
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" class="task-card__avatar">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
@import '~/assets/styles.scss';

.task-card {
  background-color: var(--task-card-bg);
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  padding: 0 0.875rem;
  border-radius: var(--card-border-radius);
  border-left: 2px solid transparent;
  margin: 1.25rem; 
  -webkit-transition: box-shadow 0.3s ease; 
  transition: box-shadow 0.3s ease; 

  &__header {
    padding-top: 1.25rem; 
    padding-bottom: 0.5rem; 
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    span {
      margin-left: 1.25rem; 
      cursor: pointer;

      &:hover {
        color: var(--text-primary);
      }
    }
  }

  &__title {
    font-size: 1rem; 
  }

  &__footer {
    border-top: 1px solid rgba(212, 212, 212, 0.8);
    padding: 0.875rem 0; 
  }

  &__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }

  &__description {
    margin-top: 0.25rem; 
    color: var(--text-light);
  }

  &__info-text {
    font-size: 0.75rem;
  }

  @media (max-width: 768px) {
    .task-card {
      margin: 1rem; 
    }

    &__header {
      padding-top: 1rem;
      padding-bottom: 0.25rem;
    }

    &__title {
      font-size: 0.875rem; 
    }

    &__actions {
      span {
        margin-left: 1rem; 
      }
    }

    &__avatar {
      width: 2rem; 
      height: 2rem;
    }

    &__footer {
      padding: 0.625rem 0; 
    }
  }

  @media (max-width: 480px) {
    .task-card {
      margin: 0.75rem; 
    }

    &__title {
      font-size: 0.75rem; 
    }

    &__actions {
      span {
        margin-left: 0.75rem; 
      }
    }

    &__avatar {
      width: 1.75rem;
      height: 1.75rem;
    }

    &__info-text {
      font-size: 0.625rem; 
    }
  }
}

</style>
