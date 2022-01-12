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
    />,
    document.getElementById('root')
  )
}
const schema = 'todoapp'
let tlfs: LocalFirst
const docs: Doc[] = []
let selectedDoc: DocId
const pendingInvitations: [DocId, Schema][] = []
const start = async () => {
  tlfs = await pkg.create(lenses)
  console.log('Peer ID:', tlfs.sdk.getPeerId())
  const x: ReadableStreamDefaultReader<number> = tlfs.sdk
    .subscribeInvites()
    .getReader()
  x.read().then(async function wakeup(): Promise<void> {
    const yy: [DocId, Schema][] = Array.from(await tlfs.sdk.invites())
    pendingInvitations.push(...yy)
    return x.read().then(wakeup)
  })

  const doc: Doc = await tlfs.sdk.createDoc(schema)
  docs.push(doc)
  actions.setDoc(doc.id())

  const w = window as any
  w.state = state
  w.tlfs = tlfs

  draw()
}

start()
