import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import 'todomvc-app-css/index.css'

import pkg, { Doc } from 'tlfs'
import { Todo } from './constants/TodoFilters'
import { Filter } from './components/Footer'
import { Actions } from './constants/ActionTypes'
import LocalFirst from 'tlfs'

/**
 * todoapp {
    0.1.0 {
  .: Struct
  .title: MVReg<String>
  .tasks: Array
  .tasks.[]: Struct
  .tasks.[].title: MVReg<String>
  .tasks.[].complete: EWFlag
    }
}
cargo run --target x86_64-unknown-linux-gnu -- --input ../api/dart/test/todoapp.tlfs --output /dev/stdout | base64 -w0
 */
const lenses = Array.from(
  atob(
    'AAIDAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAACAAAAOj///8AAAAAAAAAAAAAAAACAAAAdGl0bGUAAAUAAAAAAAAAAAgAAADo////AAAAAAAAAAAAAAAAAAIDAAAAAAAAAAAAAAAAAAAAAAAHAAAAdGl0bGUAAAXg////AAAAAAgAAADo////AAAAAAAAAAAAAAAAY29tcGxldGUCAAAACAAAAPT///8AAAAAAAAAAAgAAADo////AAAAAAAAAAAAAAAAY29tcGxldGUAAQAAAAAAAAAAAAAAAAAAAAAAAAcAAAAIAAAA4P///+D///8AAAAACAAAAOj///8AAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAIAAAB0aXRsZQAABQAAAAAAAAAABwAAAHRpdGxlAAAFpP7//wAAAAACAAAAdGFza3MAAAUAAAAAAAAAAAcAAAB0YXNrcwAABZD+//8AAAAABwAAAHRhc2tzAAAFpP7//wAAAAAHAAAAdGFza3MAAAW4/v//AAAAAAcAAAB0YXNrcwAABeD+//8AAAAABwAAAHRhc2tzAAAF/P7//wAAAAAHAAAAdGFza3MAAAUs////AAAAADj///8KAAAAdG9kb2FwcAcKAAAA/P3///gBAADs////AQAAAA=='
  ),
  (c) => c.charCodeAt(0)
)

export type PeerId = string
export type Schema = string
export type DocId = string

export type TodoState = {
  title: string
  tasks: Todo[]
}
let state: TodoState = { title: 'Empty', tasks: [] }
let filter: Filter = Filter.All
const actions: Actions = {
  addTodo: (title: string) => {
    state.tasks.push({ complete: false, title })
    draw()
  },
  clearCompleted: () => {
    state.tasks = state.tasks.filter(({ complete }) => !complete)
    draw()
  },
  completeAllTodos: () => {
    state.tasks.forEach((t) => {
      t.complete = true
    })
    draw()
  },
  completeTodo: (idx) => {
    state.tasks[idx].complete = true
    draw()
  },
  deleteTodo: (idx) => {
    state.tasks = state.tasks.filter((_v, i) => i !== idx)
    draw()
  },
  editTodo: (idx: number, title: string, complete: boolean) => {
    state.tasks[idx] = { complete, title }
    draw()
  },
  setVisibilityFilter: (_filter: Filter) => {
    filter = _filter
    draw()
  },
  addDoc: (doc: DocId, schema: Schema) => {
    docs.push(tlfs.sdk.addDoc(doc, schema))
    draw()
  },
  createDoc: () => {
    tlfs.sdk.createDoc(schema).then((doc) => {
      docs.push(doc)
      draw()
    })
  },
  setDoc: (id: DocId) => {
    selectedDoc = id
    state = tlfs.proxy(docs.find((d) => d.id() === id)!)
    draw()
  },
  share: (id: DocId, peer: PeerId) => {
    const doc = docs.find((d) => d.id() === id)!
    const causal = doc.createCursor().sayCan(peer, 3) // Own
    doc.applyCausal(causal)
    doc.invitePeer(peer)
  },
  clearInvitation: (id: DocId) => {
    pendingInvitations = pendingInvitations.filter((d) => d[0] !== id)
    draw()
  }
}
const draw = () => {
  render(
    <App
      state={state}
      actions={actions}
      filter={filter}
      pendingInvitations={pendingInvitations}
      docs={docs}
      selectedDoc={selectedDoc}
      connectedPeers={Array.from(connectedPeers)}
    />,
    document.getElementById('root')
  )
}
const schema = 'todoapp'
let tlfs: LocalFirst
const docs: Doc[] = []
let selectedDoc: DocId
let pendingInvitations: [DocId, Schema][] = []
let connectedPeers: Set<PeerId> = new Set()
const start = async () => {
  tlfs = await pkg.create('tlfs_react_demo-0.1.0', lenses)
  console.log('Peer ID:', tlfs.sdk.getPeerId())
  const invites: ReadableStreamDefaultReader<number> = tlfs.sdk
    .subscribeInvites()
    .getReader()
  invites.read().then(async function wakeup(): Promise<void> {
    const yy: [DocId, Schema][] = Array.from(await tlfs.sdk.invites())
    console.log('new invites', yy)
    pendingInvitations.push(...yy)
    return invites.read().then(wakeup)
  })

  for (const a in await tlfs.sdk.addresses()) {
    console.log('Listening on', a)
  }
  setInterval(async () => {
    for (const a in await tlfs.sdk.addresses()) {
      console.log('Listening on', a)
    }
  }, 30000)
  setInterval(async () => {
    const peers = Array.from(await tlfs.sdk.connectedPeers())
    const newPeers = peers.filter((x) => !connectedPeers.has(x))
    // TODO: snackbar
    newPeers.forEach((p) => console.log('New connection to', p))
    const disconnectedPeers = [...connectedPeers].filter(
      (x) => !peers.includes(x)
    )
    disconnectedPeers.forEach((p) => console.log('Lost connection to', p))
    connectedPeers = new Set(peers)
    draw()
  }, 5000)

  const doc: Doc = await tlfs.sdk.createDoc(schema)
  docs.push(doc)
  actions.setDoc(doc.id())

  const w = window as any
  w.state = state
  w.tlfs = tlfs

  draw()
}

start()
