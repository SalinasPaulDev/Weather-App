import ReactDOM from 'react-dom/client'
import Home from './views/Home.tsx'
import './index.css'
import {Provider} from 'react-redux'
import {store} from './store/store.ts'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Header} from './components/Header.tsx'
import {UserWeather} from './views/UserWeather.tsx'
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'

const persistor = persistStore(store)
const router = createBrowserRouter([
	{
		path: '/',
		element: <Header />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/weather/:userId',
				element: <UserWeather />,
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<RouterProvider router={router} />
		</PersistGate>
	</Provider>,
)
