import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import ButtonAppBar from './ButtonAppBar';
import { Container, Grid, Paper } from '@mui/material';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  TasksReducer,
  tasksReducer
} from "./state/tasks-reducer";
import {
  addTodoListAC,
  changeFilterAC, changeTodolistTitleAC,
  removeTodolistAC,
  TodolistsReducer,
  todolistsReducer
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, store} from "./state/store";
import {TodolistWithRedux} from "./TodolistWithRedux";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function AppWithRedux() {
  let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

  let dispatch = useDispatch()

  function removeTask(id: string, todolistId: string) {
    const action = removeTaskAC(id, todolistId)
    dispatch(action)
  }

  function addTask(title: string, todolistId: string) {
    dispatch(addTaskAC(title, todolistId))
  }

  function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
    dispatch(changeTaskStatusAC(id, isDone, todolistId))
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatch(changeFilterAC(todolistId, value))
  }

  function removeTodolist(id: string) {
    const action = removeTodolistAC(id)
    dispatch(action)
  }

  const addTodoList = (title: string) => {
    const action = addTodoListAC(title)
    dispatch(action)
  }

  const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC(taskId, title, todolistId))
  }

  const updateTodolistTitle = (todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC(todolistId, title))
  }

  return (
    <div className="App">
      <ButtonAppBar />
      <Container fixed >
        <Grid container style={{ padding: '20px' }} >
          <AddItemForm callBack={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {
              return <Grid item key={tl.id}>
                <Paper elevation={6} style={{ padding: '30px' }}>
                  <TodolistWithRedux id={tl.id} title={tl.title} filter={tl.filter}/>
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>

    </div>
  );
}

export default AppWithRedux;
