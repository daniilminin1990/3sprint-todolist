import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import ButtonAppBar from './ButtonAppBar';
import { Container, Grid, Paper } from '@mui/material';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id) })
        // //достанем нужный массив по todolistId:
        // let todolistTasks = tasks[todolistId];
        // // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        // tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({ ...tasks });
    }

    function addTask(title: string, todolistId: string) {
        let task = { id: v1(), title: title, isDone: false };
        setTasks({ ...tasks, [todolistId]: [task, ...tasks[todolistId]] })
        // let task = { id: v1(), title: title, isDone: false };
        // //достанем нужный массив по todolistId:
        // let todolistTasks = tasks[todolistId];
        // // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        // tasks[todolistId] = [task, ...todolistTasks];
        // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({ ...tasks });
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? { ...t, isDone } : t) })
        // //достанем нужный массив по todolistId:
        // let todolistTasks = tasks[todolistId];
        // // найдём нужную таску:
        // let task = todolistTasks.find(t => t.id === id);
        // //изменим таску, если она нашлась
        // if (task) {
        //     task.isDone = isDone;
        //     // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        //     setTasks({ ...tasks });
        // }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, filter: value } : tl))
        // let todolist = todolists.find(tl => tl.id === todolistId);
        // if (todolist) {
        //     todolist.filter = value;
        //     setTodolists([...todolists])
        // }
    }

    function removeTodolist(id: string) {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodolists(todolists.filter(tl => tl.id != id));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({ ...tasks });
    }

    const addTodoList = (title: string) => {
        const todolistId = v1();
        const newTodo: TodolistType = { id: todolistId, title, filter: "all" }
        setTodolists([newTodo, ...todolists])
        setTasks({ ...tasks, [todolistId]: [] })
    }

    const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? { ...el, title } : el) })
    }

    const updateTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, title } : tl))
        // // найдем нужный todolist
        // const todolist = todolists.find(tl => tl.id === todolistId);
        // if (todolist) {
        //     // Если нашелся - изменим ему заголовок
        //     todolist.title = title;
        //     setTodolists([...todolists])
        // }
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
                                        changeTaskStatus={changeStatus}
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

export default App;
