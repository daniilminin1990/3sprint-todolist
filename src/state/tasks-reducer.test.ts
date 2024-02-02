import { TasksStateType } from './../App';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import { addTodoListAC, removeTodolistAC } from './todolists-reducer';

test('correct task should be deleted from correct array', ()=> {
  const startState: TasksStateType = {
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

  const action = removeTaskAC('2', 'todolistId2');

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

test('correct task should be added to correct array', () => {
  const startState: TasksStateType = {
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

  const action = addTaskAC('juice', 'todolistId2');

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juice')
  expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
  const startState: TasksStateType = {
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

  const action = changeTaskStatusAC('2', false, 'todolistId2');

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'][1].isDone).toBe(false)
  // то, что адресовываюсь к id по string '2', это все равно что без string, можно просто цифрой написать
  // expect(endState['todolistId2']['2'].isDone).toBe(false)
  expect(endState['todolistId1'][1].isDone).toBe(true)
})

test('title of specified task should be changed', () => {
  const startState: TasksStateType = {
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

  const action = changeTaskTitleAC('2', 'beer', 'todolistId2');

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'][1].title).toBe('beer')
  // строка ниже это тоже самое что строка выше, только адресовываемся не стрингой с номером id, а индексом массива
  // expect(endState['todolistId2'][1].isDone).toBe(false)
  expect(endState['todolistId1'][1].title).toBe('JS')
})


// Т.е. нам внутри нашего сегодняшнего редьюсера tasks-reducer нужно реагировать еще и на экшены, которые как бы предназначены для другого редьюсера.
// Давайте эти 2 случая покроем тестами. Случай добавления тудулиста... Ниже тест, который нужно удовлетворить. Подсказка: id для тудулиста сгенерируйте внутри редьюсера
test('new array shoul be added when new todolist is added', () => {
  const startState: TasksStateType = {
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

  const action = addTodoListAC('new Todolist');

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState);
  const newKey=keys.find(k => k != 'todolistId1' && k != 'todolistId2');
  if(!newKey){
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const startState: TasksStateType = {
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

  const action = removeTodolistAC('todolistId2');

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  
  expect(keys.length).toBe(1);
  expect(endState['todolistId2']).not.toBeDefined();
})