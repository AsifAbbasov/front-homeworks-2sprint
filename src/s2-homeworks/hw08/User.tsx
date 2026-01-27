import React from 'react'
import { UserType } from './HW8'
import s from './HW8.module.css'

// тип пропсов компоненты User
// компонент получает ОДНОГО пользователя, не массив
type UserPropsType = {
  u: UserType
}

// User — это презентационный компонент
// он ничего не считает, не сортирует и не фильтрует
// он просто отображает данные
const User: React.FC<UserPropsType> = ({ u }) => {
  return (
    // <tr>, потому что компонент рендерится внутри <tbody>
    // если здесь будет div — таблица станет невалидной
    <tr id={'hw8-user-' + u._id + '-' + u.age} className={s.item}>
      <td id={'hw8-user-name-' + u._id} className={s.nameCol}>
        {/* отображаем имя пользователя */}
        {u.name}
      </td>

      <td id={'hw8-user-age-' + u._id}>
        {/* отображаем возраст пользователя */}
        {u.age}
      </td>
    </tr>
  )
}

export default User
