import { v1 } from "uuid"
import { FilterValuesType, TodolistType } from "../App"

let initialState: TodolistType[] = []
export const todolistsReducer = (state = initialState, action: TodolistsReducer): TodolistType[] => {
  switch(action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(s => s.id !== action.payload.id)
    }
    case 'ADD-TODOLIST': {
      // let newTodolistId = v1()
      // let newTodolist: TodolistType = {id: newTodolistId, title: action.payload.title, filter: 'all'}
      let newTodolist: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}
      return [...state, newTodolist]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
    }
    default: return state
  }
}

export type TodolistsReducer = RemoveTodolistAC | AddTodoListAC | ChangeTodolistTitleAC | ChangeFilterAC

export type RemoveTodolistAC = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (id: string ) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: { 
      id,
    }
  } as const
}

export type AddTodoListAC = ReturnType<typeof addTodoListAC>

export const addTodoListAC = (title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      title,
      todolistId: v1()
    }
  } as const
}

type ChangeTodolistTitleAC = ReturnType <typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (id: string, title: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: { id, title }
  } as const
}

type ChangeFilterAC = ReturnType <typeof changeFilterAC>

export const changeFilterAC = (id: string, filter: FilterValuesType ) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {filter, id}
  } as const
}