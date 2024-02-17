import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import { TasksStateType } from "../App"

let startState : TasksStateType

beforeEach(() => {
  startState = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false},
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false},
    ],
  };
})



test('correct task should be deleted from correct array', ()=> {

  const action = removeTaskAC('todolistId2', '2');

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false},
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '3', title: 'tea', isDone: false},
    ],
  })
})

// Второй тест
test('correct task should be added to correct array', () => {

  const action = addTaskAC( 'todolistId2', 'juice');

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juice')
  expect(endState['todolistId2'][0].isDone).toBe(false)
})

// 3 test ChangeTasksStatus
test('status of specified task should be changed', () => {

  const action = changeTaskStatusAC('todolistId2', '2', false);

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'][1].isDone).toBe(false)
  // то, что адресовываюсь к id по string '2', это все равно что без string, можно просто цифрой написать
  // expect(endState['todolistId2']['2'].isDone).toBe(false)
  expect(endState['todolistId1'][1].isDone).toBe(true)
})

// 4 changeTaskTitle

test('title of specified task should be changed', () => {
  const action = changeTaskTitleAC('todolistId2', '2', 'beer' );

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'][1].title).toBe('beer')
  // строка ниже это тоже самое что строка выше, только адресовываемся не стрингой с номером id, а индексом массива
  // expect(endState['todolistId2'][1].isDone).toBe(false)
  expect(endState['todolistId1'][1].title).toBe('JS')
})