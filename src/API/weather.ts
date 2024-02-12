import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {WeatherDataAPI} from '../types/weatherResponse'
import {DailyForecastAPI} from '../types/dailyForecast'

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'

export const weatherAPI = createApi({
	reducerPath: 'weatherAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	endpoints: (builder) => ({
		getWeather: builder.query<
			WeatherDataAPI,
			{lat: string | undefined; long: string | undefined}
		>({
			query: ({lat, long}) =>
				`weather?lat=${lat}&lon=${long}&units=metric&lang=es&appid=${API_KEY}`,
		}),
		getDailyForecast: builder.query<
			DailyForecastAPI,
			{lat: string; long: string}
		>({
			query: ({lat, long}) =>
				`forecast?lat=${lat}&lon=${long}&units=metric&lang=es&appid=${API_KEY}`,
		}),
	}),
})

export const {useGetWeatherQuery, useGetDailyForecastQuery} = weatherAPI
