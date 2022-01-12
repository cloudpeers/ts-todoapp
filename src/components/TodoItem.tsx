import React, { Component, StatelessComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'
import { Todo } from '../constants/TodoFilters'

type Props = {
  todo: Todo & { id: number }
  editTodo: (id: number, txt: string, complete: boolean) => void
  deleteTodo: (id: number) => void
  completeTodo: (id: number) => void
}
type State = { editing: boolean }
export default class TodoItem extends Component<Props, State> {
  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (id: number, text: string) => {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo(id, text, this.props.todo.complete)
    }
    this.setState({ editing: false })
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.title}
          editing={this.state.editing}
          onSave={(text) => this.handleSave(todo.id, text)}
        />
      )
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
            onChange={() => completeTodo(todo.id)}
          />
          <label onDoubleClick={this.handleDoubleClick}>{todo.title}</label>
          <button className="destroy" onClick={() => deleteTodo(todo.id)} />
        </div>
      )
    }

    return (
      <li
        className={classnames({
          completed: todo.complete,
          editing: this.state.editing
        })}
      >
        {element}
      </li>
    )
  }
}
