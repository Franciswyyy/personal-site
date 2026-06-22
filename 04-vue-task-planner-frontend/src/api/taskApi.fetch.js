import { toApiTaskPayload, toViewTask } from './taskMapper'

const TASK_API_BASE = '/api/tasks'

async function request(path, options = {}) {
  const response = await fetch(`${TASK_API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const body = await response.json()

  if (!response.ok) {
    throw new Error(body.message || `Request failed with status ${response.status}`)
  }

  if (body.code !== 'SUCCESS') {
    throw new Error(body.message || 'Request failed')
  }

  return body.data
}

export async function getTasks() {
  const tasks = await request('')
  return tasks.map(toViewTask)
}

export async function getTaskDetail(taskId) {
  const task = await request(`/detail?id=${taskId}`)
  return toViewTask(task)
}

export async function createTask(form) {
  const task = await request('/create', {
    method: 'POST',
    body: JSON.stringify(toApiTaskPayload(form)),
  })

  return toViewTask(task)
}

export async function updateTask(taskId, form) {
  const task = await request('/update', {
    method: 'POST',
    body: JSON.stringify({
      id: taskId,
      ...toApiTaskPayload(form),
    }),
  })

  return toViewTask(task)
}

export async function deleteTask(taskId) {
  await request('/delete', {
    method: 'POST',
    body: JSON.stringify({ id: taskId }),
  })
}

export async function toggleTaskStatus(taskId) {
  const task = await request('/toggle-status', {
    method: 'POST',
    body: JSON.stringify({ id: taskId }),
  })

  return toViewTask(task)
}

