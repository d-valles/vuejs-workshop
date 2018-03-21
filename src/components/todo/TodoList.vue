<template>
    <ul class="list-group">
        <li v-for="(item, index) in tasks"
            :key="index"
            class="list-group-item">
          {{item.description}} - {{item.isDone ? 'done' : 'pending'}}
          <button v-on:click="toggle(item)" class="btn btn-sm btn-primary float-right">
            toggle
          </button>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        tasks: {
            type: Array,
            default: []
        }
    },

    methods: {
        toggle(item) {
            this.$emit('toggle', item)
        }
    }
}
</script>
