import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

type Props = {
  active: boolean
  children: React.ReactChild
  setFilter: () => void
}

const Link = ({ active, children, setFilter }: Props) => (
  // eslint-disable jsx-a11y/anchor-is-valid
  <a
    className={classnames({ selected: active })}
    style={{ cursor: 'pointer' }}
    onClick={() => setFilter()}
  >
    {children}
  </a>
)

export default Link
