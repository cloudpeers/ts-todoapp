import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import { Todo } from '../constants/TodoFilters'
import { Actions } from '../constants/ActionTypes'

const TodoList = ({ filteredTodos, actions }: TodoListProps) => (
  <ul className="todo-list">
    {filteredTodos.map(todo =>
      <TodoItem key={todo.id} todo={todo} {...actions} />
    )}
  </ul>
)

type TodoListProps = {
  filteredTodos: Todo[],
  actions: Actions
}

export default TodoList
