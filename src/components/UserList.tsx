import {ListItem, ListItemButton, Typography} from '@mui/material'
import {User} from '../App'

export const UserList = ({name, long, lat}: User) => {
	return (
		<ListItem sx={{padding: 0}}>
			<ListItemButton
				sx={{display: 'flex', justifyContent: 'space-between', paddingLeft: 2}}
			>
				<Typography
					sx={{fontWeight: 'medium', width: '100px'}}
					variant="body1"
					component="p"
				>
					{name}
				</Typography>
				<Typography
					sx={{fontWeight: 'medium'}}
					variant="body2"
					component="p"
				>
					lat: {lat}
				</Typography>
				<Typography
					sx={{fontWeight: 'medium'}}
					variant="body2"
					component="p"
				>
					long: {long}
				</Typography>
			</ListItemButton>
		</ListItem>
	)
}
