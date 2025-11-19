import { defineStore } from 'pinia'

export const useTeachersStore = defineStore('teachers', {
  state: () => ({
    teachers: [] as Array<{
      id: string
      name: string
      subject: string
      email: string
      classIds: number[]
    }>,
    error: null as string | null
  }),

  getters: {
    getById: state => (id: string) =>
      state.teachers.find(t => t.id === id)
  },

  actions: {
    async fetchTeachers() {
      try {
        const data = await $fetch('http://localhost:3001/teachers')
        this.teachers = data
      } catch (err: any) {
        this.error = err.message
      }
    },

    async fetchTeacherById(id: string) {
      try {
        const teacher = await $fetch(`http://localhost:3001/teachers/${id}`)

        const existing = this.teachers.findIndex(t => t.id === id)

        if (existing === -1) {
          this.teachers.push(teacher)
        } else {
          this.teachers[existing] = teacher
        }

        return teacher
      } catch (err: any) {
        this.error = err.message
      }
    },

    async updateTeacher(id: string, data: any) {
      try {
        const updated = await $fetch(`http://localhost:3001/teachers/${id}`, {
          method: 'PUT',
          body: data
        })

        const index = this.teachers.findIndex(t => t.id === id)
        if (index !== -1) this.teachers[index] = updated

        return updated
      } catch (err: any) {
        this.error = err.message
      }
    },

    async createTeacher(data: any) {
      try {
        const newTeacher = await $fetch('http://localhost:3001/teachers', {
          method: 'POST',
          body: data
        })
        this.teachers.push(newTeacher)
        return newTeacher
      } catch (err: any) {
        this.error = err.message
      }
    },

    async deleteTeacher(id: string) {
      try {
        await $fetch(`http://localhost:3001/teachers/${id}`, {
          method: 'DELETE'
        })
        this.teachers = this.teachers.filter(t => t.id !== id)
      } catch (err: any) {
        this.error = err.message
      }
    }
  }
})
