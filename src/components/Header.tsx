import {Box, Typography} from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import {Link, Outlet} from 'react-router-dom'

export const Header = () => {
	return (
		<>
			<Box>
				<div className="header">
					<Link to={'/'}>
						<Typography
							sx={{fontWeight: 'bold', color: '#FFFF', cursor: 'pointer'}}
							variant="h5"
							component="h1"
						>
							Weather App
						</Typography>
					</Link>
					<WbSunnyIcon
						color="warning"
						fontSize="large"
					/>
				</div>
			</Box>
			<div>
				<Outlet />
			</div>
		</>
	)
}
