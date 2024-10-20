'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const CurrencyContext = createContext()
const apiKey = 'ira_Yd8bxOgkb9d8vpaAq3ly5wgAVkCXPs3RZhyl'
const url = `https://api.ipregistry.co/?key=${apiKey}`

export const GlobalCurrencyContext = ({ children }) => {
	const [data, setData] = useState('')
	const [currency, setCurrency] = useState('Uzb')

	useEffect(() => {
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				return response.json()
			})
			.then((data) => {
				setData(data)
			})
			.catch((error) => {
				console.error('Fetch error:', error)
			})
	}, [])

	// Update the currency based on the location data
	useEffect(() => {
		if (data?.location?.country?.name === 'Uzbekistan') {
			setCurrency('Uzb')
		} else if (data?.location?.country?.name === 'Russian Federation') {
			setCurrency('Ru')
		} else {
			setCurrency('Usd')
		}
	}, [data])

	return <CurrencyContext.Provider value={{ currency, setCurrency }}>{children}</CurrencyContext.Provider>
}

export const useCurrencyContext = () => {
	const context = useContext(CurrencyContext)
	if (!context) {
		throw new Error('useCurrencyContext must be used within a GlobalCurrencyContext')
	}
	return context
}