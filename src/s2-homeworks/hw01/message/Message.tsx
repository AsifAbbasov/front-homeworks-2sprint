import React from 'react'
import s from './Message.module.css'
import { MessageType } from '../HW1'

// нужно создать правильный тип вместо any
export type MessagePropsType = {
  message: MessageType
}

// нужно отобразить приходящие данные
export const Message = (props: MessagePropsType) => {
  return (
    <div id={'hw1-message-' + props.message.id} className={s.message}>
      <div className={s.imageAndText}>
        {/* Аватар */}
        <img
          id={'hw1-avatar-' + props.message.id}
          // создаёт студент
          src={props.message.user.avatar}
          alt={props.message.user.name}
          //
        />
        <div className={s.text}>
          {/* Имя пользователя */}
          <div id={'hw1-name-' + props.message.id} className={s.name}>
            {/*создаёт студент*/}
            {props.message.user.name}
            {/**/}
          </div>
          <pre id={'hw1-text-' + props.message.id} className={s.messageText}>
            {/* Текст сообщения */}
            {/*создаёт студент*/}
            {props.message.message.text}
            {/**/}
          </pre>
        </div>
      </div>
      {/* Время сообщения */}
      <div id={'hw1-time-' + props.message.id} className={s.time}>
        {/*создаёт студент*/}
        {props.message.message.time}
        {/**/}
      </div>
    </div>
  )
}
