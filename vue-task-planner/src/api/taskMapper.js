const priorityTextByCode = {
  LOW: '低',
  MEDIUM: '中',
  HIGH: '高',
}

const priorityCodeByText = {
  低: 'LOW',
  中: 'MEDIUM',
  高: 'HIGH',
}

export function toViewTask(apiTask) {
  return {
    id: apiTask.id,
    title: apiTask.title,
    category: apiTask.category,
    priority: priorityTextByCode[apiTask.priority] ?? apiTask.priority,
    done: apiTask.status === 'DONE',
    note: apiTask.note ?? '',
    createdAt: apiTask.createdAt,
    updatedAt: apiTask.updatedAt,
    priorityCode: apiTask.priority,
    status: apiTask.status,
  }
}

export function toApiTaskPayload(form) {
  return {
    title: form.title.trim(),
    category: form.category,
    priority: priorityCodeByText[form.priority] ?? form.priority,
    note: form.note,
  }
}

