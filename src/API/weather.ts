import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {WeatherData} from '../types/response'

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
				`weather?lat=${lat}&lon=${long}&units=metric&lang=es&appid=97db651c677929b0316f4b06c41de955`,
		}),
	}),
})

export const {useGetWeatherQuery} = weatherAPI
