import axios from 'axios'
import { toApiTaskPayload, toViewTask } from './taskMapper'

const client = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

async function request(config) {
  try {
    const response = await client(config)
    const body = response.data

    if (body.code !== 'SUCCESS') {
      throw new Error(body.message || 'Request failed')
    }

    return body.data
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message)
    }

    throw error
  }
}

export async function getTasks() {
  const tasks = await request({
    method: 'GET',
    url: '/tasks',
  })

  return tasks.map(toViewTask)
}

export async function getTaskDetail(taskId) {
  const task = await request({
    method: 'GET',
    url: '/tasks/detail',
    params: { id: taskId },
  })

  return toViewTask(task)
}

export async function createTask(form) {
  const task = await request({
    method: 'POST',
    url: '/tasks/create',
    data: toApiTaskPayload(form),
  })

  return toViewTask(task)
}

export async function updateTask(taskId, form) {
  const task = await request({
    method: 'POST',
    url: '/tasks/update',
    data: {
      id: taskId,
      ...toApiTaskPayload(form),
    },
  })

  return toViewTask(task)
}

export async function deleteTask(taskId) {
  await request({
    method: 'POST',
    url: '/tasks/delete',
    data: { id: taskId },
  })
}

export async function toggleTaskStatus(taskId) {
  const task = await request({
    method: 'POST',
    url: '/tasks/toggle-status',
    data: { id: taskId },
  })

  return toViewTask(task)
}

