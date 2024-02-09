// eslint-disable-next-line import/named
import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import {User} from '../views/Home'
import {v4 as uuidv4} from 'uuid'
import {UserData} from '../components/Modal'

interface UserState {
	users: User[]
}
const initialState: UserState = {
	users: [
		{
			id: '1',
			name: 'Roberto',
			lat: '37.77493',
			long: '-122.41942',
		},
		{
			id: '2',
			name: 'Brian',
			lat: '40.4165',
			long: '-3.70256',
		},
		{
			id: '3',
			name: 'Alex',
			lat: '19.42847',
			long: '-99.12766',
		},
	],
}

const CreateUserSlice = createSlice({
	name: 'CREATE_USER',
	initialState,
	reducers: {
		createUser: (state, action: PayloadAction<UserData>) => {
			state.users.push({
				id: uuidv4(),
				name: action.payload.name,
				lat: action.payload.lat,
				long: action.payload.long,
			})
		},
	},
})

export default CreateUserSlice
export const {createUser} = CreateUserSlice.actions
