import React from 'react'

const SportsGamblingCard = ({
	team1: any,
	team2: string,
	odds1: string,
	odds2: string,
	date: string,
	time,
	place,
}) => {
	return (
		<div className='bg-white p-4 rounded-md shadow-lg max-w-md mx-auto'>
			<div className='flex justify-between items-center mb-4'>
				<div className='text-lg font-bold'>{team1}</div>
				<div className='text-lg font-bold'>{team2}</div>
			</div>
			<div className='flex justify-between items-center mb-4'>
				<div className='text-gray-500'>Odds: {odds1}</div>
				<div className='text-gray-500'>Odds: {odds2}</div>
			</div>
			<div className='mb-4'>
				<p className='text-gray-600'>Date: {date}</p>
				<p className='text-gray-600'>Time: {time}</p>
			</div>
			<p className='text-gray-600 mb-4'>Place: {place}</p>
			<button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
				Place Bet
			</button>
		</div>
	)
}

export default SportsGamblingCard
