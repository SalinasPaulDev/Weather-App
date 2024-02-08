import {Typography} from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny'

export const Header = () => {
	return (
		<div className="header">
			<Typography
				sx={{fontWeight: 'bold', color: '#FFFF'}}
				variant="h2"
				component="h1"
			>
				Weather App
			</Typography>
			<WbSunnyIcon
				color="warning"
				fontSize="large"
			/>
		</div>
	)
}
