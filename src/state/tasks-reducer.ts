import { v1 } from "uuid"
import { FilterValuesType, TasksStateType, TodolistType } from "../App"

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
  switch(action.type) {
    case '': {
      return state
    }
    case '': {
      return state
    }
    // // case 'CHANGE-TODOLIST-FILTER': {
    // //   return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
    // // }
    // case 'CHANGE-TODOLIST-FILTER': {
    //   const todolist = state.find(tl => tl.id === action.payload.id);
    //   if(todolist){
    //     // если нашелся, изменим ему заголовок
    //     todolist.filter = action.payload.filter
    //   }
    //   return [...state]
    // }

    // default: return state
    default:
      throw new Error("I don't understand this type")
  }
}

type ActionsType = FirstActionType | SecondActionType

// export type FirstActionType = {
//   type: ''
// }
export type FirstActionType = ReturnType<typeof firstAC>

export const firstAC = (id: string ) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: { id }
  } as const
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