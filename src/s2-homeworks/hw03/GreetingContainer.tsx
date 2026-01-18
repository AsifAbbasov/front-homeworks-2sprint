import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import Greeting from './Greeting'
import { UserType } from './HW3'

type GreetingContainerPropsType = {
  users: UserType[] // need to fix any
  addUserCallback: (name: string) => void // need to fix any
}

export const pureAddUser = (
  name: string,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setName: React.Dispatch<React.SetStateAction<string>>,
  addUserCallback: (name: string) => void
) => {
  if (!name.trim()) {
    setError('Ошибка! Введите имя')
  } else {
    addUserCallback(name)
    setName('')
  }
}

export const pureOnBlur = (
  name: string,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!name.trim()) setError('Ошибка! Введите имя')
}

export const pureOnEnter = (
  e: React.KeyboardEvent<HTMLInputElement>, // 1. Событие клавиатуры, которое произошло в input
  addUser: () => void // 2. Функция, которая добавляет пользователя, берётся из GreetingContainer
) => {
  if (e.key === 'Enter') {
    // 3. Проверяем, какая клавиша была нажата
    addUser() // 4. Если это Enter → вызываем функцию addUser, которая добавляет пользователя
  }
}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
  users,
  addUserCallback,
}) => {
  // деструктуризация пропсов
  const [name, setName] = useState<string>('') // need to fix any
  const [error, setError] = useState<string>('') // need to fix any

  const setNameCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e — это событие изменения input (onChange)
    // ChangeEvent<HTMLInputElement> значит:
    // событие произошло в input, и у него есть value

    const newName = e.currentTarget.value
    // e.currentTarget — это сам input
    // .value — то, что пользователь сейчас ввёл
    // сохраняем это значение в переменную

    setName(newName)
    // обновляем состояние name
    // теперь input управляется через React (controlled input)

    if (error) {
      setError('')
    }
    // если ранее была ошибка:
    // пользователь начал ввод → значит ошибку нужно убрать
  }

  const addUser = () => {
    pureAddUser(name, setError, setName, addUserCallback)
  }

  const onBlur = () => {
    pureOnBlur(name, setError)
  }

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // e — событие нажатия клавиши в input
    // тип KeyboardEvent<HTMLInputElement> означает:
    // событие клавиатуры, произошедшее в input

    pureOnEnter(
      e, // передаём событие, чтобы проверить e.key
      addUser // передаём функцию добавления пользователя
    )
  }

  const totalUsers = users.length
  const lastUserName = users.length ? users[users.length - 1].name : ''

  return (
    <Greeting
      name={name}
      setNameCallback={setNameCallback}
      addUser={addUser}
      onBlur={onBlur}
      onEnter={onEnter}
      error={error}
      totalUsers={totalUsers}
      lastUserName={lastUserName}
    />
  )
}

export default GreetingContainer
