<template>
  <div>
    <input
      type="text"
      v-model="newTask"
      @keydown.enter="addTask"
      :placeholder="tasks.length != 0 ? '' : 'A ToDo lista üres'"
    />
    <button @click="addTask">Add</button>

    <div>
      <h3>Elvégzendő teendők</h3>
      <ul>
        <li v-for="filteredTask in pendingTasks" :key="filteredTask.taskId">
          <input
            type="checkbox"
            v-model="filteredTask.completed"
            @click="moveToBottom(filteredTask.taskId)"
          />
          {{ filteredTask.text }}
          <button class="delete" @click="removeTask(filteredTask.taskId)">
            Törlés
          </button>
        </li>
      </ul>
    </div>
    <div>
      <h3>Elvégzett teendők</h3>
      <ul>
        <li v-for="filteredTask in completedTasks" :key="filteredTask.taskId">
          <input
            type="checkbox"
            v-model="filteredTask.completed"
            @change="moveToBottom(filteredTask.taskId)"
          />
          <span :class="{ crossedOut: filteredTask.completed }">{{
            filteredTask.text
          }}</span>
          <button class="delete" @click="removeTask(filteredTask.taskId)">
            Törlés
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Todo",
  data() {
    return {
      tasks: [] as { taskId: number; text: string; completed: boolean }[],
      newTask: "" as string,
    };
  },
  computed: {
    pendingTasks() {
      return this.tasks.filter((task) => !task.completed);
    },
    completedTasks() {
      return this.tasks.filter((task) => task.completed);
    },
  },
  methods: {
    addTask(): void {
      if (this.newTask.trim()) {
        const taskId = new Date().getTime();
        this.tasks.unshift({
          taskId,
          text: this.newTask.trim(),
          completed: false,
        });
        this.newTask = "";
      }
    },
    moveToBottom(taskId: number): void {
      const index = this.tasks.findIndex((task) => task.taskId === taskId);
      if (
        index >= 0 &&
        index < this.tasks.length &&
        this.tasks[index].completed
      ) {
        const task = this.tasks.splice(index, 1)[0];
        task.completed = !task.completed;
        this.tasks.push(task);
      }
    },

    removeTask(taskId: number): void {
      const index = this.tasks.findIndex((task) => task.taskId === taskId);
      if (index >= 0) {
        this.tasks.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
.crossedOut {
  text-decoration: line-through;
}
.delete {
  border: none;
  outline: none;
  background-color: transparent;
}
.delete:hover {
  cursor: pointer;
}
</style>
