import moment from 'moment'
import {ForecastList} from '../../types/dailyForecast'
import {Typography} from '@mui/material'

export const Cards = ({dailyForecast}: {dailyForecast: ForecastList}) => {
	console.log(dailyForecast)
	const currentHour = moment(dailyForecast.dt_txt).format('LT')
	return (
		<div>
			<Typography
				fontWeight={'bold'}
				variant="body2"
				component={'p'}
			>
				{currentHour}
			</Typography>
			<div className="card-item-container">
				<Typography
					fontWeight={'bold'}
					variant="h5"
					component={'p'}
					color={'#FFFF'}
				>
					{Math.round(dailyForecast.main.temp)}°C
				</Typography>
				<img
					src={`https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`}
					alt="icon"
				/>
				<Typography
					variant="body1"
					component={'p'}
					color={'#FFFF'}
				>
					{dailyForecast.weather[0].description}
				</Typography>
			</div>
		</div>
	)
}
