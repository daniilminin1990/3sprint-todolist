import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

// Объединяя reducer-ы с помощью combineReducers мы задаем структуру нашего единственного объекта состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
})

// непосредственно создаем store
export const store = legacy_createStore(rootReducer)
// Определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;