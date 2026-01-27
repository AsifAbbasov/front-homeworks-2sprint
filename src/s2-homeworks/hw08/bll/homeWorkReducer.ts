import { UserType } from '../HW8'

// описываем ВСЕ возможные действия reducer'а
// это нужно, чтобы TypeScript не позволил передать что-то лишнее
type ActionType =
  | { type: 'sort'; payload: 'up' | 'down' }
  | { type: 'check'; payload: number }

// reducer — чистая функция:
// 1. ничего не мутирует
// 2. при одинаковых входных данных всегда даёт одинаковый результат
export const homeWorkReducer = (
  state: UserType[], // state — всегда массив пользователей
  action: ActionType // action — только один из описанных выше типов
): UserType[] => {
  switch (action.type) {
    case 'sort': {
      // НЕЛЬЗЯ сортировать state напрямую, потому что sort мутирует массив
      // поэтому сначала создаём копию
      const copyState = [...state]

      // сортируем по имени
      // localeCompare — корректный способ сравнения строк
      copyState.sort((a, b) => {
        // если payload === 'up', сортируем по возрастанию
        if (action.payload === 'up') {
          return a.name.localeCompare(b.name)
        }

        // если payload === 'down', сортируем по убыванию
        return b.name.localeCompare(a.name)
      })

      // возвращаем НОВЫЙ массив
      return copyState
    }

    case 'check': {
      // фильтрация не мутирует массив, но всё равно возвращает новый
      // оставляем только тех, у кого age >= payload
      return state.filter(u => u.age >= action.payload)
    }

    default:
      // если пришло неизвестное действие — просто возвращаем state
      // reducer обязан быть устойчивым
      return state
  }
}
