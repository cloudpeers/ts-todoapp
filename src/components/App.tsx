import React from 'react'
import { TodoState } from '..'
import { Actions } from '../constants/ActionTypes'
import { Todo } from '../constants/TodoFilters'
import { Filter } from './Footer'
import Header from './Header'
import MainSection from './MainSection'
import TodoItem from './TodoItem'


type Props = {
  state: TodoState, actions: Actions, filter: Filter
}
const App = ({ state, actions, filter }: Props) => {
  return (

    <div>
      <Header addTodo={actions.addTodo} />
      <MainSection

        actions={actions}
        completedCount={state.tasks.filter(({ complete }) => complete).reduce(x => x + 1, 0)}
        todosCount={state.tasks.length}
        filter={filter}
        todos={state.tasks.map((v, id) => ({ ...v, id })).filter(({ complete }) => {
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
  )
}

export default App
