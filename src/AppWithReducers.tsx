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

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function AppWithReducers() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, dispatchToTodolists] = useReducer<Reducer<Array<TodolistType>, TodolistsReducer>>(todolistsReducer, [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ])

  let [tasks, dispatchToTasks] = useReducer<Reducer<TasksStateType, TasksReducer>>(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true }
    ],
    [todolistId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "React Book", isDone: true }
    ]
  });


  function removeTask(id: string, todolistId: string) {
    const action = removeTaskAC(id, todolistId)
    dispatchToTasks(action)
    // или так - dispatchToTasks(removeTaskAC(id, todolistId))
  }

  function addTask(title: string, todolistId: string) {
    dispatchToTasks(addTaskAC(title, todolistId))
  }

  function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
    dispatchToTasks(changeTaskStatusAC(id, isDone, todolistId))
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatchToTodolists(changeFilterAC(todolistId, value))
  }

  function removeTodolist(id: string) {
    const action = removeTodolistAC(id)
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }

  const addTodoList = (title: string) => {
    const action = addTodoListAC(title)
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }

  const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatchToTasks(changeTaskTitleAC(taskId, title, todolistId))
  }

  const updateTodolistTitle = (todolistId: string, title: string) => {
    dispatchToTodolists(changeTodolistTitleAC(todolistId, title))
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
              let allTodolistTasks = tasks[tl.id];
              let tasksForTodolist = allTodolistTasks;

              if (tl.filter === "active") {
                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
              }
              if (tl.filter === "completed") {
                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
              }

              return <Grid item key={tl.id}>
                <Paper elevation={6} style={{ padding: '30px' }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    updateTaskTitle={updateTaskTitle}
                    updateTodolistTitle={updateTodolistTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>

    </div>
  );
}

export default AppWithReducers;
