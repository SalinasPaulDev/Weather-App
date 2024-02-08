import {Autocomplete, Box, Modal, TextField, Typography} from '@mui/material'

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	height: 400,
	bgcolor: '#EEEDEB',
	border: '2px solid #EEEDEB',
	boxShadow: 24,
	p: 4,
	borderRadius: 2,
} as const

export const UserModal = ({open}: {open: boolean}) => {
	return (
		<div>
			<div>
				<Modal
					open={open}
					onClose={() => {}}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Typography
							id="modal-modal-title"
							variant="h6"
							component="h2"
						>
							Agrega un nuevo usuario
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
					</Box>
				</Modal>
			</div>
		</div>
	)
}
