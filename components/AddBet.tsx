import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'

export default function AddBet(props: {
	teamName: any
	odds: any
	units: any
	betType: any
	opps: any
	user_bet: string
	payout: string
	is_winner: any
	notes: any
	created_at: any
}) {
	const { teamName } = props
	const { odds } = props
	const { units } = props
	const { betType } = props
	const { user_bet } = props
	const { opps } = props
	const { notes } = props
	const { payout } = props
	const { is_winner } = props
	const { created_at } = props

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant='outline'
					className='flex flex-1 w-full rounded m-2'
				>
					Add New Bet
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						Make changes to your profile here. Click save when you're done.
					</SheetDescription>
				</SheetHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label
							htmlFor='name'
							className='text-right'
						>
							Name
						</Label>
						<Input
							id='name'
							value='Pedro Duarte'
							className='col-span-3'
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label
							htmlFor='username'
							className='text-right'
						>
							Username
						</Label>
						<Input
							id='username'
							value='@peduarte'
							className='col-span-3'
						/>
					</div>
				</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button type='submit'>Save changes</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
