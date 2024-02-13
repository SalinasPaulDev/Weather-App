import {combineReducers, configureStore} from '@reduxjs/toolkit'
import CreateUserSlice from './CreateUserSlice'
import {setupListeners} from '@reduxjs/toolkit/query'
// eslint-disable-next-line import/named
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'
import ModalSlice from './ModalSlice'
import {weatherAPI} from '../API/weather'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import storageSession from 'redux-persist/lib/storage/session'
import {thunk} from 'redux-thunk'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['createUser'],
}

const rootReducer = combineReducers({
	createUser: CreateUserSlice.reducer,
	setOpenModal: ModalSlice.reducer,
	[weatherAPI.reducerPath]: weatherAPI.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({serializableCheck: false}).concat(
			weatherAPI.middleware,
		),
})

setupListeners(store.dispatch)

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
	ReturnType<typeof store.getState>
> = useSelector
export const persistor = persistStore(store)
