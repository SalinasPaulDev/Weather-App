// eslint-disable-next-line import/named
import {PayloadAction, createSlice} from '@reduxjs/toolkit'

interface ModalState {
	open: boolean
}

const initialState: ModalState = {
	open: false,
}

const ModalSlice = createSlice({
	name: 'CREATE_USER',
	initialState,
	reducers: {
		setOpenModal: (state, action: PayloadAction<ModalState>) => {
			state.open = action.payload.open
		},
	},
})

export default ModalSlice
export const {setOpenModal} = ModalSlice.actions
