import React, {
  ChangeEvent, // тип события для onChange у input
  DetailedHTMLProps, // позволяет унаследовать все HTML-пропсы
  InputHTMLAttributes, // набор атрибутов для <input>
  KeyboardEvent, // тип события клавиатуры
  ReactNode, // тип для всего, что можно отрендерить
} from 'react'
import s from './SuperInputText.module.css' // CSS-модуль со стилями

// тип пропсов обычного input — берём ВСЁ, что есть у HTML input
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

// тип пропсов SuperInputText
// убираем type, чтобы компонент всегда оставался text-инпутом
// добавляем свои удобные пропсы
type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
  onChangeText?: (value: string) => void // упрощённый onChange без event
  onEnter?: () => void // обработчик Enter
  error?: ReactNode // сообщение об ошибке
  spanClassName?: string // кастомный класс для span
}

const SuperInputText: React.FC<SuperInputTextPropsType> = ({
  onChange, // стандартный onChange input
  onChangeText, // кастомный onChange
  onKeyPress, // стандартный onKeyPress
  onEnter, // кастомный Enter
  error, // ошибка
  className, // внешний класс input
  spanClassName, // внешний класс span
  id, // id для input и span
  ...restProps // все остальные пропсы: value, disabled, placeholder и т.д.
}) => {
  // обработчик изменения значения input
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e) // если передали обычный onChange — отдаём event
    onChangeText?.(e.currentTarget.value) // если передали onChangeText — отдаём value
  }

  // обработчик клавиатуры
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress?.(e) // прокидываем стандартный onKeyPress
    onEnter && e.key === 'Enter' && onEnter() // если Enter — вызываем onEnter
  }

  // классы для span с ошибкой
  const finalSpanClassName =
    s.error + (spanClassName ? ' ' + spanClassName : '')

  // классы для input
  const finalInputClassName =
    s.input + // базовый класс
    (error ? ' ' + s.errorInput : ' ' + s.superInput) + // стиль по наличию ошибки
    (className ? ' ' + className : '') // внешний класс

  return (
    <div className={s.inputWrapper}>
      {' '}
      {/* обёртка input + error */}
      <input
        id={id} // id input
        type='text' // тип зафиксирован
        onChange={onChangeCallback} // обработчик изменения
        onKeyPress={onKeyPressCallback} // обработчик клавиатуры
        className={finalInputClassName} // собранные классы
        {...restProps} // value, disabled, placeholder и т.д.
      />
      <span
        id={id ? id + '-span' : undefined} // id для span
        className={finalSpanClassName} // классы ошибки
      >
        {error} {/* сообщение об ошибке */}
      </span>
    </div>
  )
}

export default SuperInputText
