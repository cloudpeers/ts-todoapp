import React from 'react'
import PropTypes from 'prop-types'
import TodoTextInput from './TodoTextInput'

type Props = {
  addTodo: (title: string) => void
}

const Header = ({ addTodo }: Props) => (
  <header className="header">
    <h1>todos</h1>
    <TodoTextInput
      newTodo
      onSave={(text) => {
        if (text.length !== 0) {
          addTodo(text)
        }
      }}
      placeholder="What needs to be done?"
      editing={true}
      text=""
    />
  </header>
)

export default Header
