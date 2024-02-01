import Checkbox from '@mui/material/Checkbox';
import React, { ChangeEvent } from 'react'

type CheckboxUniversalProps = {
  callBack: (newTaskStatus: boolean) => void
  checked: boolean
}

export const CheckboxUniversal = (props: CheckboxUniversalProps) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.callBack(e.currentTarget.checked)
    console.log(e.currentTarget.checked)
  }
  return (
    <Checkbox onChange={onChangeHandler} checked={props.checked} />
  )
}