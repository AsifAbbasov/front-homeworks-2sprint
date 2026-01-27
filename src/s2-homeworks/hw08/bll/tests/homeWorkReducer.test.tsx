// импорт React здесь НЕ нужен, потому что мы НЕ рендерим JSX
// тесты проверяют только reducer, поэтому можно его удалить
// import React from 'react'

import { homeWorkReducer } from '../homeWorkReducer'
import { UserType } from '../../HW8'

// тестовые данные для всех тестов
// let initialState объявлен снаружи, чтобы beforeEach каждый раз создавал новый массив
let initialState: UserType[]

// beforeEach — запуск перед каждым тестом
// это гарантирует, что сортировки или фильтры
// не повлияют на другие тесты
beforeEach(() => {
  initialState = [
    { _id: 0, name: 'Кот', age: 3 },
    { _id: 1, name: 'Александр', age: 66 },
    { _id: 2, name: 'Коля', age: 16 },
    { _id: 3, name: 'Виктор', age: 44 },
    { _id: 4, name: 'Дмитрий', age: 40 },
    { _id: 5, name: 'Ирина', age: 55 },
  ]
})

// тест сортировки по имени по возрастанию
test('sort name up', () => {
  // вызываем reducer с действием сортировки 'up'
  const newState = homeWorkReducer(initialState, {
    type: 'sort',
    payload: 'up',
  })

  // проверяем, что первый элемент — "Александр", его _id === 1
  expect(newState[0]._id).toBe(1)

  // пояснение: этот тест проверяет только первый элемент
  // если сортировка сломается в середине — тест не заметит
  // но базовая проверка проходит
})

// тест сортировки по имени по убыванию
test('sort name down', () => {
  const newState = homeWorkReducer(initialState, {
    type: 'sort',
    payload: 'down',
  })

  // проверяем, что первый элемент — "Кот", его _id === 0
  expect(newState[0]._id).toBe(0)

  // комментарий: аналогично тесту "up"
  // проверяется только первый элемент
})

// тест фильтрации по возрасту
test('check age 18', () => {
  const newState = homeWorkReducer(initialState, {
    type: 'check',
    payload: 18,
  })

  // проверяем длину массива — должны остаться только совершеннолетние
  expect(newState.length).toBe(4)

  // пояснение: тест проверяет только количество элементов
  // можно добавить проверку, что все age >= 18, чтобы тест был надежнее
})
