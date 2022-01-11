export const SHOW_ALL = 'show_all'
export const SHOW_COMPLETED = 'show_completed'
export const SHOW_ACTIVE = 'show_active'


export type Todo = {
	id: number,
	complete: boolean,
	title: string
}