import React, {
  SelectHTMLAttributes,
  DetailedHTMLProps,
  ChangeEvent,
} from 'react'
import s from './SuperSelect.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: any[]
  onChangeOption?: (option: any) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = ({
  options,
  className,
  onChange,
  onChangeOption,
  ...restProps
}) => {
  const mappedOptions: any[] = options
    ? options.map(o => (
        <option
          id={'hw7-option-' + o.id}
          className={s.option}
          key={o.id}
          value={o.id}
        >
          {o.value}
        </option>
      ))
    : [] // map options with key

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    // e.currentTarget.value — значение выбранного <option>
    // ВАЖНО: это всегда строка, даже если value у option число
    const selectedValue = e.currentTarget.value

    // Если функция onChangeOption пришла через props, вызываем её
    // Приводим selectedValue к числу, чтобы state HW7 правильно обновился
    if (onChangeOption) {
      onChangeOption(Number(selectedValue))
    }
  }

  const finalSelectClassName = s.select + (className ? ' ' + className : '')

  return (
    <select
      className={finalSelectClassName}
      onChange={onChangeCallback}
      {...restProps}
    >
      {mappedOptions}
    </select>
  )
}

export default SuperSelect
