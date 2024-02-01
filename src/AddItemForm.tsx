import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

type AddItemFormProps = {
  callBack: (title: string) => void
}

export const AddItemForm = (props: AddItemFormProps) => {
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  // Функция, отправляющая локальный стейт в глобальный (в App)
  const addTask = () => {
    let newTitle = title.trim();
    if (newTitle !== "") {
      props.callBack(newTitle);
      setTitle("");
    } else {
      setError("Title is required");
    }
  }

  // Функция, создающая локальный стейт - записывающая title
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  // Функция, запускаяющая функцию addTask при нажатии на кнопку Enter
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTask();
    }
  }

  const styles = {
    maxWidth: '38px',
    maxHeight: '38px',
    minWidth: '38px',
    minHeight: '38px',
    backgroundColor: '#3cb37b'
  }

  return (
    <div>
      {/* <input 
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? "error" : ""}
      /> */}
      <TextField
        error={!!error}
        value={title}
        size='small'
        id='outlined-basic'
        label={error ? error : 'Type smth'}
        variant='outlined'
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? "error" : ""}
      />
      {/* <button onClick={addTask}>+</button> */}
      <Button variant='contained' onClick={addTask} style={styles}>+</Button>
      {/* {error && <div className="error-message">{error}</div>} */}
    </div>
  )
}
