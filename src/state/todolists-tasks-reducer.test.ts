import { TasksStateType, TodolistType } from "../App"
import { tasksReducer } from "./tasks-reducer";
import { addTodoListAC, todolistsReducer } from "./todolists-reducer";

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistType> = []

  const action = addTodoListAC('new Todolist');

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolostsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolostsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolistId)
  expect(idFromTodolists).toBe(action.payload.todolistId)
  expect(endTodolostsState[endTodolostsState.length - 1].title).toBe('new Todolist')
})