// eslint-disable-next-line import/named
import {PayloadAction, createSlice} from '@reduxjs/toolkit'
interface CommonState {
	userCreated: boolean
	userUpdated: boolean
	userDeleted: boolean
}
const initialState: CommonState = {
	userCreated: false,
	userUpdated: false,
	userDeleted: false,
}

export enum EventsListenerEnum {
	CREATE_USER = 'CREATE_USER',
	UPDATE_USER = 'UPDATE_USER',
	DELETE_USER = 'DELETE_USER',
}

type Events = {
	event: EventsListenerEnum
	value: boolean
}

const CommonSlice = createSlice({
	name: 'CommonSlice',
	initialState,
	reducers: {
		eventListener: (state, action: PayloadAction<Events>) => {
			if (action.payload.event === EventsListenerEnum.CREATE_USER) {
				state.userCreated = action.payload.value
			}
			if (action.payload.event === EventsListenerEnum.UPDATE_USER) {
				state.userUpdated = action.payload.value
			}
			if (action.payload.event === EventsListenerEnum.DELETE_USER) {
				state.userDeleted = action.payload.value
			}
		},
	},
})

export default CommonSlice
export const {eventListener} = CommonSlice.actions
