import {Box, Button, Modal, TextField, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {User} from '../views/Home'
import {useAppDispatch, useAppSelector} from '../store/store'
import {createUser, updateUser} from '../store/CreateUserSlice'
import {setOpenModal} from '../store/ModalSlice'
import AddCircleIcon from '@mui/icons-material/AddCircle'

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
	const [newUser, setNewUser] = useState<UserData>({
		name: '',
		lat: '',
		long: '',
	})
	const dispatch = useAppDispatch()
	const isModalOpen = useAppSelector((state) => state.setOpenModal.open)
	const editModeId = useAppSelector((state) => state.setOpenModal.editId)
	const users = useAppSelector((state) => state.createUser.users)
	const [isDisabled, setIsDisabled] = useState(false)

	const addNewUser = ({name, lat, long}: UserData) => {
		dispatch(createUser({name, lat, long}))
	}

	const onHandleCreate = (e: React.MouseEvent) => {
		e.preventDefault()
		addNewUser(newUser)
		dispatch(setOpenModal({open: false}))
		setNewUser({name: '', lat: '', long: ''})
	}

	const onEditMode = () => {
		const found = users.find((x) => x.id === editModeId)
		console.log(found)

		found && setNewUser({name: found.name, lat: found.lat, long: found.long})
	}

	const onHandleEdit = () => {
		dispatch(
			updateUser({
				id: editModeId || '',
				name: newUser.name,
				lat: newUser.lat,
				long: newUser.long,
			}),
		)
		dispatch(setOpenModal({open: false}))
		setNewUser({name: '', lat: '', long: ''})
	}

	const onSubmit = (e: React.MouseEvent) => {
		if (editModeId) {
			onHandleEdit()
		} else {
			onHandleCreate(e)
		}
	}

	useEffect(() => {
		if (editModeId) {
			onEditMode()
		}
	}, [isModalOpen])

	useEffect(() => {
		setIsDisabled(
			!newUser.name.length || !newUser.lat.length || !newUser.long.length,
		)
	}, [newUser])

	const handleValidation = (value: string, field: 'name' | 'lat' | 'long') => {
		if (field === 'name') {
			if (value.length > 12) {
				return (value = '')
			}
			setNewUser((rest) => ({...rest, name: value}))
		}
		if (field === 'lat' || field === 'long') {
			if (value.length > 12) {
				return (value = '')
			}
			const regex = /^-?\d*(\.\d*)?$/

			if (regex.test(value)) {
				setNewUser((rest) => ({...rest, [field]: value}))
			}
		}
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
						{editModeId ? 'Editar usuario' : 'Agrega usuario'}
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
							value={newUser.name}
							onChange={({target}) => handleValidation(target.value, 'name')}
						/>
						<TextField
							id="standard-basic"
							label="Latitud"
							variant="standard"
							sx={{width: '90%'}}
							value={newUser.lat}
							onChange={({target}) => {
								// if (target.value === '') {
								// 	setNewUser((rest) => ({...rest, lat: ''}))
								// }
								handleValidation(target.value, 'lat')
							}}
						/>
						<TextField
							id="standard-basic"
							label="Longitud"
							variant="standard"
							sx={{width: '90%'}}
							value={newUser.long}
							onChange={({target}) => handleValidation(target.value, 'long')}
						/>
					</Box>
					<Button
						onClick={(e) => {
							onSubmit(e)
						}}
						sx={{marginTop: '30px'}}
						variant="outlined"
						disabled={isDisabled}
					>
						{editModeId ? 'Editar usuario' : 'Crear usuario'}
					</Button>
				</Box>
			</Modal>
		</div>
	)
}
