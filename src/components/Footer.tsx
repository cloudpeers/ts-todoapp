import React from 'react'
import PropTypes from 'prop-types'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'
import Link from './Link'
import { setVisibilityFilter } from '../actions'

export enum Filter {
  'All' = 'All',
  'Active' = 'Active',
  'Completed' = 'Completed'
}

type Props = {
  activeCount: number,
  completedCount: number,
  onClearCompleted: () => void
  setFilter: (filter: Filter) => void
  activeFilter: Filter
}

const Footer = (props: Props) => {
  const { activeCount, completedCount, onClearCompleted, setFilter, activeFilter } = props
  const itemWord = activeCount === 1 ? 'item' : 'items'
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {(Object.keys(Filter) as Array<keyof typeof Filter>).map(filter =>
          <li key={filter}>
            <Link setFilter={() => setFilter(filter as Filter)} active={filter === activeFilter}>
              <>{filter}</>
            </Link>
          </li>
        )}
      </ul>
      {
        !!completedCount &&
        <button
          className="clear-completed"
          onClick={onClearCompleted}
        >Clear completed</button>

      }
    </footer>
  )
}

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
}

export default Footer
