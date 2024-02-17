import { v1 } from "uuid"
import { TasksStateType } from "../App"
import { constants } from "buffer"
import { AddTodoListAC, RemoveTodolistAC } from "./todolists-reducer"

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
    case "CHANGE-TASK-STATUS": {
      const a = action
      return {...state, [a.todolistId]: state[a.todolistId].map(t => {
        return t.id === a.taskId ? {...t, isDone: a.isDone} : t
      })}
    }
    case "CHANGE-TASK-TITLE": {
      const a = action
      return {...state, [a.todolistId]: state[a.todolistId].map(t => {
        return t.id === a.taskId ? {...t, title: a.title} : t
      })}
    }
    case "ADD-TODOLIST": {
      return {...state, [action.payload.todolistId]: []}
    }
    case "REMOVE-TODOLIST": {
      // const copyState = {...state}
      // delete copyState[action.payload.id]
      // return copyState
      const {[action.payload.id]:restToDelete, ...restState} = state
      return restState
    }
    default: throw new Error("I don't understand this type")
  }
}

type ActionsType = RemoveTaskActionType | AddTaskACType | СhangeTaskStatusAC 
| ChangeTaskTitleAC 
| AddTodoListAC
| RemoveTodolistAC

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todolistId: string, taskId: string) => {
  return { type: 'REMOVE-TASK', taskId, todolistId } as const
}

export type AddTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todolistId: string, title: string, ) => {
  return {
    type: 'ADD-TASK',
    title,
    todolistId
  } as const
}

export type СhangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean ) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    todolistId,
    taskId,
    isDone
  } as const 
}

export type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string ) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    todolistId,
    taskId,
    title
  } as const 
}