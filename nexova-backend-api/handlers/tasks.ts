import express, { RequestHandler } from "express"
import * as taskServices from "./../services/tasks"
import * as userServices from "./../services/user"
import Task from "../models/tasks"
import User from "../models/users"

interface TASK {
  title: string
  description: string
  status: string
}
const createTask: RequestHandler = async (req, res) => {
  const idUser = res.locals.user?.id
  const user = await userServices.getUserById(idUser)
  if (!user) {
    res.status(404).json({ message: "User not found" })
    return
  }

  const data = req.body
  if (!data.title || !data.description || !data.status) {
    res.status(400).json({ message: "All fields are required" })
    return
  }

  const taskData: TASK = {
    title: data.title,
    description: data.description,
    status: data.status,
  }
  const task = new Task()

  task.title = taskData.title
  task.description = taskData.description
  task.status = taskData.status
  task.createdAt = new Date()
  task.updatedAt = new Date()

  task.user = user

  try {
    const newTask = await taskServices.createTask(task)
    res.status(201).json(newTask)
    return
  } catch (error: any) {
    res.status(500).json({ message: error.message })
    return
  }
}

const getMyTasks: RequestHandler = async (req, res) => {
  const idUser = res.locals.user?.id
  const user = await userServices.getUserById(idUser)
  if (!user) {
    res.status(404).json({ message: "User not found" })
    return
  }

  const tasks = await taskServices.getTasksByUser(user)
  if (!tasks) {
    res.status(404).json({ message: "No tasks found" })
    return
  }

  res.status(200).json(tasks)
}

const completeTask: RequestHandler = async (req, res) => {
  const idUser = res.locals.user?.id
  const user = await userServices.getUserById(idUser)
  if (!user) {
    res.status(404).json({ message: "User not found" })
    return
  }

  const taskId = req.params.id
  if (!taskId) {
    res.status(400).json({ message: "Task ID is required" })
    return
  }

  const task = await taskServices.getTaskById(Number(taskId))
  if (!task) {
    res.status(404).json({ message: "Task not found" })
    return
  }

  task.status = "completed"
  task.updatedAt = new Date()

  try {
    const updatedTask = await taskServices.updateTask(task)
    res.status(200).json(updatedTask)
    return
  } catch (error: any) {
    res.status(500).json({ message: error.message })
    return
  }
}

export { createTask, getMyTasks, completeTask }