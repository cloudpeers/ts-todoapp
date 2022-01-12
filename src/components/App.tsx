import React from 'react'
import { Doc } from 'tlfs'
import { DocId, PeerId, Schema, TodoState } from '..'
import { Actions } from '../constants/ActionTypes'
import { Todo } from '../constants/TodoFilters'
import { Filter } from './Footer'
import Header from './Header'
import MainSection from './MainSection'
import Menu from './Menu'
import TodoItem from './TodoItem'

type Props = {
  state: TodoState
  actions: Actions
  filter: Filter
  pendingInvitations: [DocId, Schema][]
  docs: Doc[]
}
const App = ({ state, actions, filter, docs }: Props) => {
  return (
    <>
      <div className="todoapp">
        <Header addTodo={actions.addTodo} />
        <MainSection
          actions={actions}
          completedCount={state.tasks
            .filter(({ complete }) => complete)
            .reduce((x) => x + 1, 0)}
          todosCount={state.tasks.length}
          filter={filter}
          todos={state.tasks
            .map((v, id) => ({ ...v, id }))
            .filter(({ complete }) => {
              switch (filter) {
                case Filter.Active:
                  return !complete
                case Filter.Completed:
                  return complete
                case Filter.All:
                  return true
              }
            })}
        />
      </div>
      <>
        <Menu addDoc={actions.createDoc} docs={docs} setDoc={actions.setDoc} />
      </>
    </>
  )
}

export default App
