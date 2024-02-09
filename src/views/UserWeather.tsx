import {Box, Typography} from '@mui/material'
import {useGetWeatherQuery} from '../API/weather'
import {useLocation, useNavigate} from 'react-router-dom'
import {useAppSelector} from '../store/store'
import {useEffect, useState} from 'react'
import {User} from './Home'

export const UserWeather = () => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const {data} = useGetWeatherQuery({
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
	}, [])

	return (
		<>
			{!data ? (
				<div>Loading...</div>
			) : (
				<Box
					textAlign={'center'}
					py={2}
					px={2}
				>
					<Box>
						<Typography
							sx={{fontWeight: 'medium'}}
							variant="h5"
							component="div"
						>
							{currentUser?.name}
						</Typography>

						<Box
							display={'flex'}
							justifyContent={'space-between'}
							alignItems={'center'}
						>
							<Box
								display={'flex'}
								alignItems={'center'}
							>
								<Typography
									sx={{fontWeight: 'bold'}}
									variant="h4"
									component="p"
									color={'#00009'}
								>
									{Math.round(data?.main.temp)}°C
								</Typography>
								<img
									src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
									alt="icon"
								/>
							</Box>
							<Box>
								<Typography
									sx={{fontWeight: 'base'}}
									variant="h6"
									component="p"
								>
									{data?.name}
								</Typography>
								<Typography
									fontWeight={'bold'}
									textAlign={'right'}
									variant="caption"
									component="p"
								>
									Humedad: {data?.main.humidity}%
								</Typography>
								<Typography
									fontWeight={'bold'}
									textAlign={'right'}
									variant="caption"
									component="p"
								>
									Viento: {Math.round(data?.wind.speed)} km/h
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			)}
		</>
	)
}
