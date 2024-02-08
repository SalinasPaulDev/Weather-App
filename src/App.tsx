import {Box, Button, List, Typography} from '@mui/material'
import {UserModal} from './components/Modal'
import {Header} from './components/Header'
import {UserList} from './components/UserList'
import AddSharpIcon from '@mui/icons-material/AddSharp'
import {useState} from 'react'

export interface User {
	name: string
	lat: number
	long: number
}

const users: User[] = [
	{
		name: 'Roberto',
		lat: -34.60235679879754,
		long: -58.366892365430196,
	},
	{
		name: 'Brian',
		lat: -34.60235679879754,
		long: -58.366892365430196,
	},
	{
		name: 'Alex',
		lat: -34.60235679879754,
		long: -58.366892365430196,
	},
]

function App() {
	const [open, setOpen] = useState<boolean>(false)
	return (
		<>
			<Header />

			<Box sx={{textAlign: 'start', padding: 10, margin: 'auto'}}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Typography
						sx={{mt: 4, mb: 2, fontWeight: 'medium'}}
						variant="h4"
						component="div"
					>
						Usuarios:
					</Typography>
					<Button
						variant="contained"
						size="small"
						sx={{height: 35}}
						onClick={() => setOpen(true)}
					>
						<AddSharpIcon
							fontSize="small"
							sx={{marginRight: 1}}
						/>
						Agregar
					</Button>
				</Box>
				<List sx={{padding: 0}}>
					{users.map((user) => (
						<UserList
							name={user.name}
							lat={user.lat}
							long={user.long}
							key={user.name}
						/>
					))}
				</List>
			</Box>

			<UserModal open={open} />
		</>
	)
}

export default App
