import { defineStore } from 'pinia'
import { api } from '../composition/api'

export const useTodoStore = defineStore('todo', {
  actions: {
    async addTodo(content, Authorization) {
      try {
        return await api.post('todos', { todo: { content } }, { headers: { Authorization } })
      } catch (error) {
        throw error
      }
    },
    async getTodoList(Authorization) {
      try {
        return await api.get('todos', { headers: { Authorization } }).then(res => res.data.todos)
      } catch (error) {
        throw error
      }
    },
    async updateTodo({ id, content }, Authorization) {
      try {
        return await api.put(`todos/${id}`, { todo: { content } }, { headers: { Authorization } })
      } catch (error) {
        throw error
      }
    },
    async toggleTodo({ id }, Authorization) {
      try {
        return await api.patch(`todos/${id}/toggle`, null, { headers: { Authorization } })
      } catch (error) {
        throw error
      }
    },
    async deleteTodo({ id }, Authorization) {
      try {
        return await api.delete(`todos/${id}`, { headers: { Authorization } })
      } catch (error) {
        throw error
      }
    },
  },
})
