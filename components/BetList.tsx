import { Database } from '@/lib/schema'
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

import MenubarMain from '@/components/Menubar'
import BetCard from '@/components/BetCard'
import { Button } from '@/components/ui/button'

type Todos = Database['public']['Tables']['todos']['Row']

export default function TodoList({ session }: { session: Session }) {
	const supabase = useSupabaseClient<Database>()
	const [todos, setTodos] = useState<Todos[]>([])
	const [newNotesText, setNewNotesText] = useState('')
	const [newTeamText, setNewTeamText] = useState('')
	const [newIsWinner, setNewIsWinner] = useState(false)
	const [newOddsText, setNewOddsText] = useState('')
	const [newUnitsText, setNewUnitsText] = useState('')
	const [newUser_BetText, setNewUser_BetText] = useState('')
	const [newBet_TypeText, setNewBet_TypeText] = useState('')
	const [newOppsText, setNewOppsText] = useState('')
	const [newPayoutText, setNewPayoutText] = useState('')
	const [newCreated_at, setNewCreated_at] = useState('')
	const [errorText, setErrorText] = useState('')

	const user = session.user

	useEffect(() => {
		const fetchTodos = async () => {
			const { data: todos, error } = await supabase
				.from('todos')
				.select('*')
				.order('id', { ascending: false })

			if (error) console.log('error', error)
			else setTodos(todos)
		}

		fetchTodos()
	}, [supabase])

	const addTodo = async (
		notesText: string,
		teamText: string,
		oddsText: string,
		oppsText: string,
		unitsText: string,
		newPayoutText: string,
		user_betText: string,
		bet_typeText: string
	) => {
		let notes = notesText.trim()
		let team = teamText.trim()
		let odds = oddsText.trim()
		let opps = oppsText.trim()
		let units = unitsText.trim()
		let user_bet = user_betText.trim()
		let payout = newPayoutText.trim()
		let bet_type = bet_typeText.trim()
		if ((notes.length, team.length)) {
			const { data: todo, error } = await supabase
				.from('todos')
				.insert({
					odds,
					bet_type,
					opps,
					units,
					notes,
					user_bet,
					team,
					payout,
					user_id: user.id,
				})
				.select()
				.single()

			if (error) {
				setErrorText(error.message)
			} else {
				setTodos([...todos, todo])
				setNewNotesText('')
				setNewTeamText('')
				setNewOddsText('')
				setNewOppsText('')
				setNewUnitsText('')
				setNewPayoutText('')
				setNewUser_BetText('')
				setNewBet_TypeText('')
			}
		}
	}

	const deleteTodo = async (id: number) => {
		try {
			await supabase.from('todos').delete().eq('id', id).throwOnError()
			setTodos(todos.filter((x) => x.id != id))
		} catch (error) {
			console.log('error', error)
		}
	}

	return (
		<div className='w-full h-full'>
			<div className='flex items-center justify-between'>
				<h1 className='mb-12'>GOTY.</h1>
				<MenubarMain />
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					addTodo(
						newNotesText,
						newTeamText,
						newOddsText,
						newOppsText,
						newUnitsText,
						newPayoutText,
						newUser_BetText,
						newBet_TypeText
					)
				}}
				className='columns-3 gap-2 my-2 justify-center'
			>
				{/* TODO: add a Bet Card visual for adding a new bet */}
				<input
					className='rounded w-full p-2 text-center'
					type='text'
					placeholder='Team'
					value={newTeamText}
					onChange={(e) => {
						setErrorText('')
						setNewTeamText(e.target.value)
					}}
				/>
				<input
					className='rounded w-full mt-2 p-2 text-center'
					type='text'
					placeholder='Opponent'
					value={newOppsText}
					onChange={(e) => {
						setErrorText('')
						setNewOppsText(e.target.value)
					}}
				/>
				<input
					className='rounded w-full mt-2 p-2 text-center'
					type='text'
					placeholder='Bet Type'
					value={newBet_TypeText}
					onChange={(e) => {
						setErrorText('')
						setNewBet_TypeText(e.target.value)
					}}
				/>
				<input
					className='rounded w-full p-2 text-center'
					type='text'
					placeholder='Bet'
					value={newUser_BetText}
					onChange={(e) => {
						setErrorText('')
						setNewUser_BetText(e.target.value)
					}}
				/>
				<input
					className='rounded w-full mt-2 p-2 text-center'
					type='text'
					placeholder='Odds'
					value={newOddsText}
					onChange={(e) => {
						setErrorText('')
						setNewOddsText(e.target.value)
					}}
				/>
				<input
					className='rounded w-full mt-2 p-2 text-center'
					type='text'
					placeholder='Units'
					value={newUnitsText}
					onChange={(e) => {
						setErrorText('')
						setNewUnitsText(e.target.value)
					}}
				/>
				<input
					className='rounded w-full p-2 text-center'
					type='text'
					placeholder='Payout'
					value={newPayoutText}
					onChange={(e) => {
						setErrorText('')
						setNewPayoutText(e.target.value)
					}}
				/>
				<input
					className='rounded w-full mt-2 p-2 text-center'
					type='text'
					placeholder='Notes'
					value={newNotesText}
					onChange={(e) => {
						setErrorText('')
						setNewNotesText(e.target.value)
					}}
				/>
				<button
					className='btn-black mt-2 w-full'
					type='submit'
				>
					Add
				</button>
			</form>
			{!!errorText && <Alert text={errorText} />}
			<div className='bg-white shadow overflow-hidden rounded-md'>
				<ul>
					{todos.map((todo) => (
						<Todo
							key={todo.id}
							todo={todo}
							onDelete={() => deleteTodo(todo.id)}
						/>
					))}
				</ul>
			</div>
		</div>
	)
}

const Todo = ({ todo, onDelete }: { todo: Todos; onDelete: () => void }) => {
	const supabase = useSupabaseClient<Database>()
	const [isWinner, setIsWinner] = useState(todo.is_winner)

	const toggle = async () => {
		try {
			const { data } = await supabase
				.from('todos')
				.update({ is_winner: !isWinner })
				.eq('id', todo.id)
				.throwOnError()
				.select()
				.single()

			if (data) setIsWinner(data.is_winner)
		} catch (error) {
			console.log('error', error)
		}
	}

	return (
		<div className='mt-5'>
			<li className='w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out'>
				<div className='flex items-center px-4 py-4 sm:px-6'>
					<div className='min-w-0 flex-1 flex items-center'>
						<div className='flex flex-col'></div>
					</div>
				</div>
			</li>
			<div className='w-full justify-items-center'>
				<BetCard
					teamName={todo.team}
					odds={todo.odds}
					units={todo.units}
					betType={todo.bet_type}
					created_at={todo.created_at}
					opps={todo.opps}
					user_bet={todo.user_bet}
					payout={todo.payout}
					notes={todo.notes}
					is_winner={todo.is_winner}
				/>

				<div>
					<div className='flex flex-col items-center mx-auto justify-center space-x-2 space-y-2 m-2'>
						<label
							htmlFor='terms'
							className='text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
						>
							Winner?
						</label>
						<div className='flex w-full items-center mx-auto'>
							<input
								id='terms'
								className='flex-1 h-6 rounded-[5px] mx-auto'
								onChange={(e) => toggle()}
								type='checkbox'
								checked={isWinner ? true : false}
							/>
							{/* //TODO: Need to add a bet lost button. */}
							{/* <input
								id='terms'
								className='flex-1 h-6 rounded-[5px] mx-auto'
								onChange={(e) => toggle()}
								type='checkbox'
								checked={isLoser ? true : false}
							/> */}
						</div>
					</div>
				</div>
				<div className='flex w-full mx-auto px-10 py-2'>
					<Button
						className='flex-1 rounded-xl'
						variant='destructive'
						onClick={(e) => {
							e.preventDefault()
							e.stopPropagation()
							onDelete()
						}}
					>
						Delete
					</Button>

					<Button className='flex-1 rounded-xl'>Update</Button>
				</div>
			</div>
		</div>
	)
}

const Alert = ({ text }: { text: string }) => (
	<div className='rounded-md bg-red-100 p-4 my-3'>
		<div className='text-sm leading-5 text-red-700'>{text}</div>
	</div>
)
