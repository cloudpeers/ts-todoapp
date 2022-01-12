import React from 'react'
import Footer, { Filter } from './Footer'
import TodoList from './TodoList'
import { Actions } from '../constants/ActionTypes'
import { Todo } from '../constants/TodoFilters'

const MainSection = ({ todosCount, completedCount, actions, todos, filter }: MainSectionProps) =>
(
  <section className="main">
    {
      !!todosCount &&
      <span>
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todosCount}
          readOnly
        />
        <label onClick={actions.completeAllTodos} />
      </span>
    }
    <TodoList actions={actions} filteredTodos={todos} />
    {
      !!todosCount &&
      <Footer
        completedCount={completedCount}
        activeCount={todosCount - completedCount}
        onClearCompleted={actions.clearCompleted}
        setFilter={actions.setVisibilityFilter}
        activeFilter={filter}
      />
    }
  </section>
)
type MainSectionProps = {
  todos: (Todo & { id: number })[],
  todosCount: number,
  completedCount: number,
  actions: Actions,
  filter: Filter
}


export default MainSection;