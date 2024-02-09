import React from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import DeleteIcon from '@mui/icons-material/Delete';
import { CheckboxUniversal } from './CheckboxUniversal';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export function TodolistWithRedux(props: PropsType) {
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id])
    let dispatch = useDispatch()

    const removeTodolist = () => dispatch(removeTodolistAC(props.id))

    const onAllClickHandler = () => dispatch(changeFilterAC(props.id, 'all'))
    const onActiveClickHandler = () => dispatch(changeFilterAC(props.id, 'active'))
    const onCompletedClickHandler = () => dispatch(changeFilterAC(props.id, 'completed'))

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(title, props.id))
    }

    const updateTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC(props.id, title))
    }

    const changeTaskStatusHandler = (tID: string, newTaskStatus: boolean) => {
        dispatch(changeTaskStatusAC(tID, newTaskStatus, props.id))
    }

    if (props.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callBack={updateTodolistTitleHandler} />
            <Button variant="contained" onClick={removeTodolist}>X</Button>
        </h3>
        <IconButton aria-label="fingerprint" color="secondary">
            <Fingerprint />
        </IconButton>
        <AddItemForm callBack={addTaskHandler} />
        {tasks.length === 0 ? (
            <p>There is nothing to show</p>
        ) : (
            <ul>
                {
                    tasks.map(t => {
                        const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id))

                        const updateTaskTitleHandler = (title: string) => {
                            dispatch(changeTaskTitleAC(t.id, title, props.id))
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <CheckboxUniversal callBack={(newTaskStatus) => changeTaskStatusHandler(t.id, newTaskStatus)} checked={t.isDone} />
                            <EditableSpan oldTitle={t.title} callBack={updateTaskTitleHandler} />
                            <IconButton aria-label="delete" onClick={onClickHandler}>
                                <DeleteIcon />
                            </IconButton>
                        </li>
                    })
                }
            </ul>
        )}
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : "contained"} color='success' onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? 'outlined' : "contained"} color='error' onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : "contained"} color='primary' onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}


