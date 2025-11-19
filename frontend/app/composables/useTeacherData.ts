export async function useTeacherData(id: string) {
  const store = useTeachersStore()

  async function loadTeacher() {
    // Always fetch on initial load to avoid SSR hydration issues
    const teacher = await store.fetchTeacherById(id)

    if (!teacher) {
      throw createError({
        statusCode: 404,
        message: `Teacher with id ${id} not found`
      })
    }

    return teacher
  }

  return await useAsyncData(`teacher-${id}`, loadTeacher)
}
