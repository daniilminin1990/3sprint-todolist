import { v1 } from "uuid"
import { TasksStateType, TodolistType } from "../App"
import { TaskType } from "../Todolist"
import { AddTodoListAC, RemoveTodolistAC } from "./todolists-reducer"

export const tasksReducer = (state: TasksStateType, action: TasksReducer): TasksStateType => {
  switch(action.type) {
    case 'REMOVE-TASK': {
      return {
        ...state, 
        [action.todolistId]: state[action.todolistId]
          .filter(t => t.id !== action.taskId)
      }
    }
    case 'ADD-TASK': {
      const newTask: TaskType = {id: v1(), title: action.title, isDone: false}
      return {...state, [action.todolistId]:[newTask, ...state[action.todolistId]]}
    }
    case 'CHANGE-TASK-STATUS': {
      return {
        ...state, 
        [action.todolistId]: state[action.todolistId]
          .map(t => t.id === action.taskId ? {...t, isDone: action.isDone } : t)
          // Я бы написал так и не пришлось бы boolean параметр создавать
          // .map(t => t.id === action.taskId ? {...t, isDone: !t.isDone } : t)
        }
    }
    case "CHANGE-TASK-TITLE": {
      return {
        ...state, 
        [action.todolistId]: state[action.todolistId]
          .map (t => t.id === action.taskId ? {...t, title: action.newTaskTitle} : t)
        }
    }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.payload.todolistId]: []
      }
    }
    case "REMOVE-TODOLIST": {
      // const {[action.payload.id]: restTaskData, ...restState} = state
      // return restState
      let copyState = {...state}
      delete copyState[action.payload.id]
      return copyState
      // delete state[action.payload.id]
      // return {...state}
    }
    default:
      throw new Error("I don't understand this type")
  }
}

export type TasksReducer = RemoveTaskActionType
| AddTaskActionType 
| ChangeTaskStatusActionType 
| ChangeTaskTitleActionType
| AddTodoListAC
| RemoveTodolistAC

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (taskId: string, todolistId: string ) => {
  return { type: 'REMOVE-TASK', taskId, todolistId } as const
}

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export const addTaskAC = (title: string, todolistId: string) => {
  return { type: 'ADD-TASK', title, todolistId} as const
}

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
  return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId} as const
}

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (taskId: string, newTaskTitle: string, todolistId: string) => {
  return {type: 'CHANGE-TASK-TITLE', taskId, newTaskTitle, todolistId} as const
}