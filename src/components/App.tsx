import React from 'react'
import { Doc } from 'tlfs'
import { DocId, PeerId, Schema, TodoState } from '..'
import { Actions } from '../constants/ActionTypes'
import { Todo } from '../constants/TodoFilters'
import { Filter } from './Footer'
import Header from './Header'
import InvitationDialog from './InvitationDialog'
import MainSection from './MainSection'
import Menu from './Menu'
import TodoItem from './TodoItem'

type Props = {
  state: TodoState
  actions: Actions
  filter: Filter
  pendingInvitations: [DocId, Schema][]
  docs: Doc[]
  selectedDoc: DocId
  connectedPeers: PeerId[]
}
const App = ({
  state,
  actions,
  filter,
  docs,
  selectedDoc,
  connectedPeers,
  pendingInvitations
}: Props) => {
  let invitationDialog
  if (pendingInvitations.length > 0) {
    const [doc, schema] = pendingInvitations[0]
    invitationDialog = (
      <InvitationDialog
        accept={() => {
          actions.addDoc(doc, schema)
          actions.clearInvitation(doc)
        }}
        ignore={() => {
          actions.clearInvitation(doc)
        }}
        doc={doc}
        open={true}
        peer={'Unknown'}
      />
    )
  }
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
        {invitationDialog}
        <Menu
          addDoc={actions.createDoc}
          shareWithPeer={actions.share}
          docs={docs}
          setDoc={actions.setDoc}
          selectedDoc={selectedDoc}
          connectedPeers={connectedPeers}
        />
      </>
    </>
  )
}

export default App
