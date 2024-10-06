import Link from 'next/link'
import './hello.scss'

const Hello = () => {
	return (
		<section className='helloSection'>
			<div className='container'>
				<div className='hello'>
					<div className='hello-text'>
						<p className='title h3'>Для Людей Московского университета</p>
						<p>
							Мерч, созданный студентами для тех, кто разделяет нашу любовь к Альма-Матер и гордость за Университет. Каждый заказ разрабатывается,
							упаковывается и отправляется студентами МГУ. Прибыль с продаж реинвестируется в зарплаты студентов, поддержку студенческих инициатив и
							развитие проекта, миссия которого — вдохновлять на покорение новых вершин, поддерживать дух общности и
							быть символом единства для всех, кто связан с МГУ.
						</p>

						<Link href='/#shop' className='toShop'>Перейти в магазин</Link>
					</div>

				</div>
			</div>
		</section>
	)
}

export default Hello
