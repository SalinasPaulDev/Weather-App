// eslint-disable-next-line import/named
import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import {User} from '../views/Home'
import {v4 as uuidv4} from 'uuid'
import {UserData} from '../components/Modal'

interface UserState {
	users: User[]
	userCreated: boolean
	userUpdated: boolean
	userDeleted: boolean
}
const initialState: UserState = {
	users: [
		{
			id: '$2y$10$exS.wXYOPWvs9zb.wcNT3O9tqmgobJ6MKmnNCW32MOxQwD4LQxiRq',
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
			id: '$2y$10$SeXUoGQmg4ok9/PjnOvomu0hyfTA70Vz5DvzsKf93DDGVn8iIKDVe',
			name: 'Alex',
			lat: '55.75222',
			long: '37.61556',
		},
		{
			id: '$2y$10$7MOZut.GVwdFsrJFQsfL7.g62ETSKSUbwXE.zDy/57wMYRRgbXJ1O',
			name: 'Milagros',
			lat: '55.75222',
			long: '37.61556',
		},
		{
			id: '$2y$10$n6I68dgDJnV6T.CCFBRFzusTlWJoyglKE7uIpGVlppMaVkdKHq9GC',
			name: 'Candela',
			lat: '19.42847',
			long: '-99.12766',
		},
	],
	userCreated: false,
	userUpdated: false,
	userDeleted: false,
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
		updateUser: (state, action: PayloadAction<User>) => {
			state.users.map((x) => {
				if (x.id === action.payload.id) {
					return (
						(x.name = action.payload.name),
						(x.long = action.payload.long),
						(x.lat = action.payload.lat)
					)
				}
				return x
			})
		},
		deleteUser: (state, action: PayloadAction<{id: string}>) => {
			const filteredUsers = state.users.filter(
				(x) => x.id !== action.payload.id,
			)
			state.users = filteredUsers
		},
	},
})

export default CreateUserSlice
export const {createUser, updateUser, deleteUser} = CreateUserSlice.actions
