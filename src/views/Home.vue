<template>
  <div class="todoListView bg-half js-view">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <span>{{ nickname }} 的待辦</span>
        </li>
        <li>
          <a href @click.prevent="logout">登出</a>
        </li>
      </ul>
    </nav>
    <div class="container todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input
            type="text"
            class="js-todoContent"
            v-model="todo"
            v-focus
            @keyup.enter="addTodo"
            placeholder="請輸入待辦事項"
          />
          <a href @click.prevent="addTodo">
            <i class="fa fa-plus js-addTodo"></i>
          </a>
        </div>
        <div class="todoList_list">
          <ul class="todoList_tab">
            <li>
              <router-link :to="{ name: 'Home' }" :class="{ active: state === '' }">
                全部
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'Home', params: { state: 'active' } }"
                :class="{ active: state === 'active' }"
              >
                待完成
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'Home', params: { state: 'complete' } }"
                :class="{ active: state === 'complete' }"
              >
                已完成
              </router-link>
            </li>
          </ul>
          <div class="todoList_items">
            <ul class="todoList_item">
              <li v-for="item in showTodoList">
                <input
                  class="todoList_input"
                  type="checkbox"
                  value="true"
                  :checked="item.completed_at"
                  @change="toggleTodo(item)"
                />

                <input
                  v-if="item.editing"
                  type="text"
                  data-type="submit"
                  v-model="item.content"
                  v-focus
                  @keyup.enter="handleToolClick(item.id, $event)"
                />
                <span v-else data-type="edit" @dblclick="handleToolClick(item.id, $event)">{{
                  item.content
                }}</span>

                <a href @click.prevent="handleToolClick(item.id, $event)">
                  <template v-if="item.editing">
                    <i class="fa fa-check" data-type="submit"></i>
                    <i class="fa fa-times" data-type="cancel"></i>
                  </template>
                  <template v-else>
                    <i class="fa fa-pencil" data-type="edit" aria-hidden="true"></i>
                    <i class="fa fa-trash" data-type="delete" aria-hidden="true"></i>
                  </template>
                </a>
              </li>
            </ul>
            <div class="todoList_statistics">
              <p>{{ totalCompleted }} 個已完成項目</p>
              <a href @click.prevent="deleteCompleted">清除已完成項目</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useTodoStore } from '@/stores/todo'

export default {
  props: {
    state: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const userStore = useUserStore()
    const todoStore = useTodoStore()

    const { authToken } = JSON.parse(localStorage.getItem('userData'))

    // create
    const todo = ref('')
    const addTodo = async () => {
      if (!todo.value) return
      try {
        await todoStore.addTodo(todo.value, authToken)
        await getTodoList()
        todo.value = ''
      } catch (error) {
        console.error(error.message)
      }
    }

    // read
    const todoList = ref([])
    const showTodoList = computed(() => {
      const list = {
        active: todoList.value.filter(item => !item.completed_at),
        complete: todoList.value.filter(item => item.completed_at),
      }
      return list[props.state] || todoList.value
    })
    const totalCompleted = computed(() => todoList.value.filter(item => item.completed_at).length)
    const getTodoList = async () => {
      try {
        todoList.value = await todoStore.getTodoList(authToken)
      } catch (error) {
        console.error(error.message)
      }
    }

    const handleToolClick = async (id, event) => {
      const { type } = event.target.dataset
      const todo = todoList.value.find(item => item.id === id)

      // update
      if (type === 'edit') {
        todo.editing = true
        todo.tempContent = todo.content
      }
      if (type === 'submit' && todo.content) {
        todo.editing = false
        todo.tempContent = ''
        try {
          await todoStore.updateTodo(todo, authToken)
        } catch (error) {
          console.error(error.message)
        }
      }
      if (type === 'cancel') {
        todo.editing = false
        todo.content = todo.tempContent
        todo.tempContent = ''
      }

      // delete
      if (type === 'delete') {
        try {
          await todoStore.deleteTodo(todo, authToken)
          getTodoList()
        } catch (error) {
          console.error(error.message)
        }
      }
    }

    // update
    const toggleTodo = async todo => {
      try {
        await todoStore.toggleTodo(todo, authToken)
        getTodoList()
      } catch (error) {
        console.error(error.message)
      }
    }

    // delete
    const deleteCompleted = async () => {
      const promises = todoList.value
        .filter(item => item.completed_at)
        .map(item => todoStore.deleteTodo(item, authToken))
      if (!promises.length) return
      try {
        await Promise.all(promises)
        getTodoList()
      } catch (error) {
        console.error(error.message)
      }
    }

    getTodoList()

    return {
      nickname: userStore.nickname,
      logout: userStore.logout,
      todo,
      addTodo,
      showTodoList,
      handleToolClick,
      toggleTodo,
      totalCompleted,
      deleteCompleted,
    }
  },
}
</script>
