import {useEffect, useRef, useState} from 'react'
import {useGetDailyForecastQuery} from '../../API/weather'
import {Cards} from './Cards'
import {ForecastList} from '../../types/dailyForecast'
import {Box, FormControl, FormHelperText, MenuItem, Select} from '@mui/material'

interface ForecastEntry {
	date: string
	list: ForecastList[]
}

export const DailyForecastCards = ({
	lat,
	long,
}: {
	lat: string
	long: string
}) => {
	const {data: forecast} = useGetDailyForecastQuery({
		lat,
		long,
	})
	const [selectedDay, setSelectedDay] = useState<string>('')
	const [listOfForecastPerDay, setListOfForecastPerDay] =
		useState<ForecastList[]>()

	const result: ForecastEntry[] = forecast
		? forecast.list.reduce(
				(accumulator: ForecastEntry[], currentValue: ForecastList) => {
					const dateParts: string[] = currentValue['dt_txt']
						.split(' ')[0]
						.split('-')
					const day: string = dateParts[2]
					const month: string = dateParts[1]

					const existingEntry: ForecastEntry | undefined = accumulator.find(
						(item) => item.date === `${day}/${month}`,
					)

					if (existingEntry) {
						existingEntry.list.push(currentValue)
					} else {
						accumulator.push({date: `${day}/${month}`, list: [currentValue]})
					}

					return accumulator
				},
				[],
			)
		: []

	const handleDate = () => {
		const data = result.find((x) => x.date === selectedDay)
		setListOfForecastPerDay(data?.list)
	}

	useEffect(() => {
		handleDate()
	}, [selectedDay])

	return (
		<>
			<Box>
				<FormControl sx={{minWidth: 80, pt: 4, float: 'left'}}>
					<Select
						value={selectedDay}
						onChange={({target}) => setSelectedDay(target.value)}
						displayEmpty
					>
						{result.map((x) => (
							<MenuItem
								key={x.date}
								value={x.date}
							>
								<em>{x.date}</em>
							</MenuItem>
						))}
					</Select>
					<FormHelperText>Dia</FormHelperText>
				</FormControl>
			</Box>

			{listOfForecastPerDay && (
				<div className="cards-container">
					{listOfForecastPerDay.map((x: ForecastList) => (
						<Cards
							key={x.dt_txt}
							dailyForecast={x}
						/>
					))}
				</div>
			)}
		</>
	)
}
