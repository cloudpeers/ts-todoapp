import { Filter } from "../components/Footer"

export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const EDIT_TODO = 'EDIT_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const COMPLETE_ALL_TODOS = 'COMPLETE_ALL_TODOS'
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'


export type Actions = {
	addTodo: (_: string) => void,
	deleteTodo: (idx: number) => void,
	editTodo: (idx: number, title: string, complete: boolean) => void,
	completeTodo: (idx: number) => void,
	completeAllTodos: () => void,
	clearCompleted: () => void,
	setVisibilityFilter: (filter: Filter) => void,

}