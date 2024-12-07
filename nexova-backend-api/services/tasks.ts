import Task from "../models/tasks"

import User from "../models/users"
const createTask = async (t: Task) => {
  if (!t) {
    throw new Error("Task is required")
  }
  return await t.save()
}

const getTasks = async () => {
  return await Task.find()
}

//get task by user

const getTasksByUser = async (user: User) => {
  return await Task.find({ where: { user } })
}

const getTaskById = async (id: number) => {
  return await Task.findOne({
    where: { id },
  })
}

const updateTask = async (t: Task) => {
  if (!t) {
    throw new Error("Task is required")
  }
  return await t.save()
}

export { createTask, getTasks, getTasksByUser, getTaskById, updateTask }