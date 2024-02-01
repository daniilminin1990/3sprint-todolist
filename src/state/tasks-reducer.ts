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
    // case '': {
    //   return state
    // }
    default:
      throw new Error("I don't understand this type")
  }
}

type ActionsType = RemoveTaskActionType | SecondActionType

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (taskId: string, todolistId: string ) => {
  return { type: 'REMOVE-TASK', taskId, todolistId } as const
}

export type SecondActionType = ReturnType<typeof secondAC>

export const secondAC = (title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      title
    }
  } as const
}