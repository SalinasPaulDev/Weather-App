import {Alert, Box, Button, Modal, TextField, Typography} from '@mui/material'
import {useEffect, useRef} from 'react'
import {User} from '../views/Home'
import {useAppDispatch, useAppSelector} from '../store/store'
import {createUser} from '../store/CreateUserSlice'
import {setOpenModal} from '../store/ModalSlice'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import {CheckCircleOutline} from '@mui/icons-material'

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90%',
	height: 400,
	bgcolor: '#EEEDEB',
	border: '2px solid #EEEDEB',
	boxShadow: 24,
	p: 4,
	borderRadius: 2,
	textAlign: 'center',
} as const

export type UserData = Omit<User, 'id'>

export const UserModal = () => {
	const newUser = useRef<UserData>({name: '', lat: '', long: ''})
	const dispatch = useAppDispatch()
	const isModalOpen = useAppSelector((state) => state.setOpenModal.open)

	const addNewUser = ({name, lat, long}: UserData) => {
		dispatch(createUser({name, lat, long}))
	}

	const onSubmit = (e: React.MouseEvent) => {
		e.preventDefault()
		addNewUser(newUser.current)
		dispatch(setOpenModal({open: false}))
	}

	return (
		<div>
			<Modal
				open={isModalOpen}
				onClose={() => dispatch(setOpenModal({open: false}))}
				sx={{maxWidth: '600px', margin: 'auto'}}
			>
				<Box sx={style}>
					<AddCircleIcon
						fontSize="large"
						sx={{margin: 'auto'}}
						color="primary"
					/>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						textAlign={'center'}
					>
						Agrega usuario
					</Typography>
					<Box
						component="form"
						sx={{
							'& > :not(style)': {m: 1, width: '25ch'},
						}}
						noValidate
						autoComplete="off"
					>
						<TextField
							id="standard-basic"
							label="Nombre"
							variant="standard"
							sx={{width: '90%'}}
							onChange={({target}) => (newUser.current.name = target.value)}
						/>
						<TextField
							id="standard-basic"
							label="Latitud"
							variant="standard"
							sx={{width: '90%'}}
							onChange={({target}) => (newUser.current.lat = target.value)}
						/>
						<TextField
							id="standard-basic"
							label="Longitud"
							variant="standard"
							sx={{width: '90%'}}
							onChange={({target}) => (newUser.current.long = target.value)}
						/>
						{/* <Autocomplete
								disablePortal
								id="combo-box-demo"
								options={[]}
								sx={{width: 300}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Movie"
									/>
								)}
							/> */}
					</Box>
					<Button
						onClick={(e) => {
							onSubmit(e)
						}}
						sx={{marginTop: '30px'}}
						variant="outlined"
					>
						Crear usuario
					</Button>
				</Box>
			</Modal>
		</div>
	)
}
