import { defineStore } from 'pinia'

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface Task {
  id: number
  title: string
  description: string
  expireDate: string
  todos: Todo[]
}

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],         
    completedTasks: [] as Task[], 
  }),

  actions: {
    initializeTasks() {
      if (typeof window !== 'undefined') {
        const savedTasks = localStorage.getItem('tasks')
        const savedCompletedTasks = localStorage.getItem('completedTasks')

        if (savedTasks) {
          this.tasks = JSON.parse(savedTasks)
        }
        if (savedCompletedTasks) {
          this.completedTasks = JSON.parse(savedCompletedTasks)
        }
      }
    },

    addTask(newTask: Task) {
      this.tasks.push(newTask)
      this.syncToLocalStorage()
    },

    updateTask(updatedTask: Task) {
      const taskIndex = this.tasks.findIndex(task => task.id === updatedTask.id)
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = updatedTask
        this.syncToLocalStorage()
      }
    },

    deleteTask(taskId: number) {
      this.tasks = this.tasks.filter(task => task.id !== taskId)
      this.completedTasks = this.completedTasks.filter(task => task.id !== taskId)
      this.syncToLocalStorage()
    },

    markTaskAsCompleted(taskId: number) {
      const taskIndex = this.tasks.findIndex(task => task.id === taskId)
      if (taskIndex !== -1) {
        const task = this.tasks.splice(taskIndex, 1)[0] 
        this.completedTasks.push(task) 
        this.syncToLocalStorage()
      }
    },

    syncToLocalStorage() {
      if (typeof window !== 'undefined') {
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
        localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks))
      }
    }
  }
})
