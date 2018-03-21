<template>
    <form v-on:submit.prevent="addTask">
        <div class="input-group">
          <input v-model="newTask" type="text" class="form-control">
          <div class="input-group-btn">
            <button class="btn btn-warning">
              add task
            </button>
          </div>
        </div>
    </form>
</template>
<script>
export default {
    data () {
        return {
            newTask: ''
        }
    },

    methods: {
        addTask() {
            this.$emit('addTask', this.newTask)
            this.newTask = ''
        }
    }
}
</script>
