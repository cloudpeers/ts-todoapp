import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

type Props = {
  onSave: (txt: string) => void
  text: string
  placeholder?: string
  editing: boolean
  newTodo?: boolean
}

type State = {
  text: string
}

export default class TodoTextInput extends Component<Props, State> {
  state = {
    text: this.props.text || ''
  }

  handleSubmit = (e: any) => {
    const text = e.target.value.trim()
    if (e.which === 13) {
      this.props.onSave(text)
      if (this.props.newTodo) {
        this.setState({ text: '' })
      }
    }
  }

  handleChange = (e: any) => {
    this.setState({ text: e.target.value })
  }

  handleBlur = (e: any) => {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value)
    }
  }

  render() {
    return (
      <input
        className={classnames({
          edit: this.props.editing,
          'new-todo': this.props.newTodo
        })}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus={true}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    )
  }
}
