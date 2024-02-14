import {Box, ListItem, Typography} from '@mui/material'
import {User} from '../views/Home'
import {Link} from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import LaunchIcon from '@mui/icons-material/Launch'
import {useAppDispatch} from '../store/store'
import {setOpenModal} from '../store/ModalSlice'
import {deleteUser} from '../store/CreateUserSlice'
import {EventsListenerEnum, eventListener} from '../store/common'

export const UserList = ({name, long, lat, id}: User) => {
	const dispatch = useAppDispatch()

	const handleEdit = () => {
		dispatch(setOpenModal({open: true, editId: id}))
	}

	const handleDelete = () => {
		dispatch(deleteUser({id}))
		dispatch(
			eventListener({event: EventsListenerEnum.DELETE_USER, value: true}),
		)
	}

	return (
		<ListItem
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingLeft: 2,
				borderBottom: '1px solid #C7C8CC',
				mt: 1,
				boxShadow: '-5px -3px 15px -7px rgba(97,97,97,0.75)',
				backgroundColor: '#FFF',
				borderRadius: 2,
			}}
		>
			<Link to={`/weather/${id}`}>
				<Typography
					sx={{
						fontWeight: 'medium',
						display: 'flex',
						alignItems: 'center',
						maxWidth: '50px',
					}}
					variant="body1"
					component="p"
					className="link"
				>
					{name}
					<LaunchIcon sx={{fontSize: '12px', textAlign: 'start'}} />
				</Typography>
			</Link>
			<Box>
				<Typography
					sx={{fontWeight: 'medium'}}
					variant="caption"
					component="p"
				>
					lat: {lat}
				</Typography>
				<Typography
					sx={{fontWeight: 'medium', textAlign: 'start'}}
					variant="caption"
					component="p"
				>
					long:{long}
				</Typography>
			</Box>
			<div>
				<EditIcon
					fontSize="small"
					sx={{color: '#1450A3'}}
					onClick={() => handleEdit()}
				/>
				<DeleteIcon
					fontSize="small"
					sx={{ml: 2, color: '#BF3131'}}
					onClick={() => handleDelete()}
				/>
			</div>
		</ListItem>
	)
}
