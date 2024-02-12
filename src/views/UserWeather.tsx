import {Box, Typography} from '@mui/material'
import {useGetWeatherQuery} from '../API/weather'
import {useLocation, useNavigate} from 'react-router-dom'
import {useAppSelector} from '../store/store'
import {useEffect, useState} from 'react'
import {User} from './Home'
import {Loader} from '../components/Loader'
import {DailyForecastCards} from '../components/ForecastCards/ForecastCards'
import {getTimezoneByLocation, indentifyHour} from '../utils/utils'

export const UserWeather = () => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const {data: currentWeather} = useGetWeatherQuery({
		lat: currentUser?.lat,
		long: currentUser?.long,
	})
	const location = useLocation()
	const users = useAppSelector((state) => state.createUser.users)
	const {pathname} = location
	const navigate = useNavigate()

	const findUser = () => {
		const userId = pathname.split('/')[2]
		const newUser = users.find(
			(user) => user.id.toLowerCase() === userId.toLowerCase(),
		)

		if (newUser) {
			setCurrentUser(newUser)
		} else {
			//! cambiar por alerta
			navigate('/')
		}
	}

	useEffect(() => {
		findUser()
		if (currentWeather?.timezone) {
			getTimezoneByLocation(currentWeather.timezone)
		}
	}, [])

	return (
		<>
			{!currentWeather ? (
				<div className="loader-container">
					<Loader />
				</div>
			) : (
				<Box
					textAlign={'center'}
					py={2}
					px={2}
					maxWidth={{md: '50%'}}
					margin={'auto'}
				>
					<Typography
						sx={{fontWeight: 'medium', color: '#39393e'}}
						variant="h5"
						component="div"
						mb={4}
					>
						{currentUser?.name}
					</Typography>
					<div
						className={`box-temp ${indentifyHour(getTimezoneByLocation(currentWeather.timezone), true)}`}
					>
						<Typography
							sx={{fontWeight: 'base'}}
							variant="h5"
							component="h3"
							color="#FFFF"
						>
							{currentWeather?.name}
						</Typography>
						<Box
							display={'flex'}
							justifyContent={'space-between'}
							alignItems={'center'}
						>
							<Box
								display={'flex'}
								alignItems={'center'}
								justifyContent={'center'}
								margin={'auto'}
							>
								<Typography
									sx={{fontWeight: 'bold'}}
									variant="h4"
									component="p"
									color={'#FFFF'}
								>
									{Math.round(currentWeather?.main.temp)}°C
								</Typography>
								<img
									src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
									alt="icon"
								/>
							</Box>
						</Box>
						<Box>
							<Typography
								fontWeight={'bold'}
								textAlign={'center'}
								variant="caption"
								component="p"
								color="#FFFF"
							>
								Humedad: {currentWeather?.main.humidity}%
							</Typography>
							<Typography
								fontWeight={'bold'}
								textAlign={'center'}
								variant="caption"
								component="p"
								color="#FFFF"
							>
								Viento: {Math.round(currentWeather?.wind.speed)} km/h
							</Typography>
						</Box>
					</div>
					{currentUser?.lat && currentUser.long && (
						<DailyForecastCards
							lat={currentUser?.lat}
							long={currentUser?.long}
						/>
					)}
				</Box>
			)}
		</>
	)
}
