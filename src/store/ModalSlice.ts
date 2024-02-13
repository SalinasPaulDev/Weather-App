// eslint-disable-next-line import/named
import {PayloadAction, createSlice} from '@reduxjs/toolkit'

interface ModalState {
	open: boolean
	editId?: string
}

const initialState: ModalState = {
	open: false,
	editId: '',
}

const ModalSlice = createSlice({
	name: 'CREATE_USER',
	initialState,
	reducers: {
		setOpenModal: (state, action: PayloadAction<ModalState>) => {
			;(state.open = action.payload.open),
				(state.editId = action.payload.editId)
		},
	},
})

export default ModalSlice
export const {setOpenModal} = ModalSlice.actions
