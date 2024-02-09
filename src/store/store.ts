import {configureStore} from '@reduxjs/toolkit'
import CreateUserSlice from './CreateUserSlice'
import {setupListeners} from '@reduxjs/toolkit/query'
// eslint-disable-next-line import/named
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'
import ModalSlice from './ModalSlice'
import {weatherAPI} from '../API/weather'

export const store = configureStore({
	reducer: {
		createUser: CreateUserSlice.reducer,
		setOpenModal: ModalSlice.reducer,
		[weatherAPI.reducerPath]: weatherAPI.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(weatherAPI.middleware),
})

setupListeners(store.dispatch)

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
	ReturnType<typeof store.getState>
> = useSelector
