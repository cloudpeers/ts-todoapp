import React from 'react'
import { TodoState } from '..'
import { Actions } from '../constants/ActionTypes'
import { Todo } from '../constants/TodoFilters'
import { Filter } from './Footer'
import Header from './Header'
import MainSection from './MainSection'
import TodoItem from './TodoItem'

//* todoapp {
//   0.1.0 {
//.: Struct
//.title: MVReg<String>
//.tasks: Array
//.tasks.[]: Struct
//.tasks.[].title: MVReg<String>
//.tasks.[].complete: EWFlag
//   }

type Props = {
  state: TodoState, actions: Actions, filter: Filter
}
const App = ({ state, actions, filter }: Props) => {
  console.log("render with", state, filter)
  return (

    <div>
      <Header addTodo={actions.addTodo} />
      <MainSection

        actions={actions}
        completedCount={state.tasks.filter(({ complete }) => complete).reduce(x => x + 1, 0)}
        todosCount={state.tasks.length}
        filter={filter}
        todos={state.tasks.filter(({ complete }) => {
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
