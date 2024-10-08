'use client'

import Link from 'next/link'
import './hello.scss'


const Hello = () => {
	return (
		<section className='helloSection' data-aos="fade-down">
			<div className='container'>
				<div className='hello'>
					<div className='hello-text'>
						<h2 className='title h2'>
							Для людей <br /> Московского университета
						</h2>
						<p>
							Мерч, созданный студентами для тех, кто разделяет нашу любовь к Альма-Матер и гордость за Университет. Каждый заказ разрабатывается,
							упаковывается и отправляется студентами МГУ. Прибыль с продаж реинвестируется в зарплаты студентов, поддержку студенческих инициатив и
							развитие проекта, миссия которого — вдохновлять на покорение новых вершин, поддерживать дух общности и быть символом единства для всех,
							кто связан с МГУ.
						</p>

						<Link href='#shop' className='toShop'>
							Перейти в магазин
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hello
