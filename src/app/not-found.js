import './styles/not-found.scss'

import Link from 'next/link'
import React from 'react'

const notFound = () => {
	return (
		<main className='not-found'>
			<div className='container'>
					<h2>Страница не найдена!</h2>
					<p>
						Такой страницы не существует или она находится в разработке
					</p>
					<Link className='toMain' href='/'>
						Перейти на главную
					</Link>
				</div>
		</main>
	)
}

export default notFound