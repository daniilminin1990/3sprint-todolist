import { v1 } from "uuid"
import { TasksStateType } from "../App"

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
  switch(action.type) {
    case 'REMOVE-TASK': {
      return {
        ...state, 
        [action.todolistId]: state[action.todolistId]
          .filter(t => t.id !== action.taskId)
      }
    }
    case 'ADD-TASK': {
      const newTask = {id: v1(), title: action.title, isDone: false}
      return {...state, [action.todolistId]:[newTask, ...state[action.todolistId]]}
    }
    default: throw new Error("I don't understand this type")
  }
}

type ActionsType = RemoveTaskActionType | AddTaskACType

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (taskId: string, todolistId: string ) => {
  return { type: 'REMOVE-TASK', taskId, todolistId } as const
}

export type AddTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: 'ADD-TASK',
    title,
    todolistId
  } as const 
}