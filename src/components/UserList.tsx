import {Box, ListItem, ListItemButton, Typography} from '@mui/material'
import {User} from '../views/Home'
import {Link} from 'react-router-dom'

export const UserList = ({name, long, lat, id}: User) => {
	return (
		<Link to={`/weather/${id}`}>
			<ListItem sx={{padding: 0}}>
				<ListItemButton
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						paddingLeft: 2,
						borderBottom: '1px solid #C7C8CC',
						mt: 1,
						boxShadow: '-5px -3px 15px -7px rgba(97,97,97,0.75)',
						backgroundColor: '#FFF',
						borderRadius: 2,
					}}
				>
					<Typography
						sx={{fontWeight: 'medium', width: '100px'}}
						variant="body1"
						component="p"
					>
						{name}
					</Typography>
					<Box>
						<Typography
							sx={{fontWeight: 'medium'}}
							variant="caption"
							component="p"
						>
							lat: {lat}
						</Typography>
						<Typography
							sx={{fontWeight: 'medium'}}
							variant="caption"
							component="p"
						>
							long:{long}
						</Typography>
					</Box>
				</ListItemButton>
			</ListItem>
		</Link>
	)
}
