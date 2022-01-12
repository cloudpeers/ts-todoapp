import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import 'todomvc-app-css/index.css'

import pkg, { Doc } from 'tlfs'
import { Todo } from './constants/TodoFilters'
import { Filter } from './components/Footer'
import { Actions } from './constants/ActionTypes'

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
let lenses = Array.from(
	atob(
		"AAIDAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAACAAAAOj///8AAAAAAAAAAAAAAAACAAAAdGl0bGUAAAUAAAAAAAAAAAgAAADo////AAAAAAAAAAAAAAAAAAIDAAAAAAAAAAAAAAAAAAAAAAAHAAAAdGl0bGUAAAXg////AAAAAAgAAADo////AAAAAAAAAAAAAAAAY29tcGxldGUCAAAACAAAAPT///8AAAAAAAAAAAgAAADo////AAAAAAAAAAAAAAAAY29tcGxldGUAAQAAAAAAAAAAAAAAAAAAAAAAAAcAAAAIAAAA4P///+D///8AAAAACAAAAOj///8AAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAIAAAB0aXRsZQAABQAAAAAAAAAABwAAAHRpdGxlAAAFpP7//wAAAAACAAAAdGFza3MAAAUAAAAAAAAAAAcAAAB0YXNrcwAABZD+//8AAAAABwAAAHRhc2tzAAAFpP7//wAAAAAHAAAAdGFza3MAAAW4/v//AAAAAAcAAAB0YXNrcwAABeD+//8AAAAABwAAAHRhc2tzAAAF/P7//wAAAAAHAAAAdGFza3MAAAUs////AAAAADj///8KAAAAdG9kb2FwcAcKAAAA/P3///gBAADs////AQAAAA=="
	),
	(c) => c.charCodeAt(0)
)


export type TodoState = {
	title: string,
	tasks: Todo[]
}
let state: TodoState = { title: "Empty", tasks: [] }
let filter: Filter = Filter.All
const actions: Actions = {
	addTodo: (title: string) => {
		state.tasks.push({ complete: false, title, })
		draw()
	},
	clearCompleted: () => {
		state.tasks = state.tasks.filter(({ complete }) => !complete)
		draw()
	},
	completeAllTodos: () => {
		state.tasks.forEach(t => { t.complete = true })
		draw()
	},
	completeTodo: (idx) => {
		state.tasks[idx].complete = true
		draw()
	},
	deleteTodo: (idx) => {
		state.tasks = state.tasks.filter((_v, i) => i !== idx)
		draw()
	}
	,
	editTodo: (idx: number, title: string, complete: boolean) => {
		state.tasks[idx] = { complete, title }
		draw()
	},
	setVisibilityFilter: (_filter: Filter) => {
		filter = _filter
		draw()
	}

}
const draw = () => {
	render(
		<App state={state} actions={actions} filter={filter} />,
		document.getElementById('root')
	)
}
const start = async () => {
	const tlfs = await pkg.create(lenses)
	console.log("Peer ID:", tlfs.sdk.getPeerId())
	const doc: Doc = await tlfs.sdk.createDoc("todoapp")
	state = tlfs.proxy(doc)
	let w = window as any
	w.state = state
	w.tlfs = tlfs

	draw()

}

start()



