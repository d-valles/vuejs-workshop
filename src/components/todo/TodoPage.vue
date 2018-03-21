<template>
  <div>
    <div class="container">
      <h1>Hello {{name ? name : 'stranger'}}</h1>
      <input v-model="name" type="text">
    </div>

    <hr>

    <div class="container">
      <todo-form @addTask="addTask"/>
    </div>

    <hr>

    <div class="container">
      <h3>Pending</h3>
      <todo-list 
        @toggle="toggle"
        :tasks="pendingTasks"/>
    </div>

    <hr>

    <div class="container">
      <h3>Completed</h3>
      <todo-list 
        @toggle="toggle"
        :tasks="completedTasks"/>
    </div>

  </div>
</template>

<script>
import TodoList from './TodoList'
import TodoForm from './TodoForm'

export default {
  data () {
    return {
      name: '',
      tasks: [
        {description: 'learn vuejs', isDone: true},
        {description: '???', isDone: false},
        {description: 'conquer vuejs', isDone: false},        
      ],
    }
  },

  components: {
    TodoList,
    TodoForm
  },

  methods: {
    toggle(item) {
      item.isDone = !item.isDone
    },
    addTask(newTask) {
      console.log('here')
      if(!newTask) return
      this.tasks.push({
        description: newTask,
        isDone: false
      })
    }
  },

  computed: {
    pendingTasks() {
       return this.tasks.filter(item => !item.isDone )
    },
    completedTasks() {
      return this.tasks.filter(item => item.isDone)
    }
  },


}
</script>
