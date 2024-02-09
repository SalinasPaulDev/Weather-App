import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {WeatherData} from '../types/response'

const API_KEY = import.meta.env.VITE_API_KEY

export const weatherAPI = createApi({
	reducerPath: 'weatherAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.openweathermap.org/data/2.5/',
	}),
	endpoints: (builder) => ({
		getWeather: builder.query<
			WeatherData,
			{lat: string | undefined; long: string | undefined}
		>({
			query: ({lat, long}) =>
				`weather?lat=${lat}&lon=${long}&units=metric&lang=es&appid=${API_KEY}`,
		}),
	}),
})

export const {useGetWeatherQuery} = weatherAPI
