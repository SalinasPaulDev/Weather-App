import {Alert, Box, Button, List, Typography} from '@mui/material'
import {UserModal} from '../components/Modal'
import {UserList} from '../components/UserList'
import AddSharpIcon from '@mui/icons-material/AddSharp'
import {useAppDispatch, useAppSelector} from '../store/store'
import {setOpenModal} from '../store/ModalSlice'
import {CheckCircleOutline} from '@mui/icons-material'
import {Loader} from '../components/Loader'
import {EventsListenerEnum, eventListener} from '../store/common'

export interface User {
	id: string
	name: string
	lat: string
	long: string
}

function Home() {
	const users = useAppSelector((state) => state.createUser.users)
	const {userCreated, userDeleted, userUpdated} = useAppSelector(
		(state) => state.common,
	)
	const dispatch = useAppDispatch()

	const handleClose = () => {
		const events = [
			EventsListenerEnum.CREATE_USER,
			EventsListenerEnum.DELETE_USER,
			EventsListenerEnum.UPDATE_USER,
		]

		events.map((event) => {
			dispatch(
				eventListener({
					event,
					value: false,
				}),
			)
		})
	}
	return (
		<>
			{!users ? (
				<Loader />
			) : (
				<>
					<Box
						sx={{
							textAlign: 'start',
							margin: 'auto',
							width: '100%',
							px: 2,
							py: 4,
						}}
					>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Typography
								sx={{fontWeight: 'medium'}}
								variant="h5"
								component="div"
							>
								Usuarios
							</Typography>
							<Button
								variant="contained"
								size="small"
								sx={{height: 32}}
								onClick={() => dispatch(setOpenModal({open: true}))}
							>
								<AddSharpIcon
									fontSize="small"
									sx={{marginRight: 1}}
								/>
								Agregar
							</Button>
						</Box>
						<List sx={{padding: 0, mt: 2}}>
							{users.map((user) => (
								<UserList
									id={user.id}
									name={user.name}
									lat={user.lat}
									long={user.long}
									key={user.id}
								/>
							))}
						</List>
					</Box>
					<UserModal />
					{(!!userCreated || !!userDeleted || !!userUpdated) && (
						<Alert
							icon={<CheckCircleOutline fontSize="inherit" />}
							severity={userDeleted ? 'error' : 'success'}
							sx={{
								position: 'absolute',
								top: 0,
								width: '100%',
							}}
							onClose={() => handleClose()}
						>
							Usuario{' '}
							{userDeleted
								? 'eliminado'
								: userCreated
									? 'creado'
									: 'actualizado'}{' '}
							con exito!.
						</Alert>
					)}
				</>
			)}
		</>
	)
}

export default Home
