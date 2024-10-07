import Image from 'next/image'
import './mission.scss'

const Mission = () => {
	return (
		<section className='mission'>
			<div className='container'>
				<div className='mission-card'>
					<Image alt='' src='/svg/discount.svg' width={30} height={30}></Image>
					<p>Скидка 15% на первый заказ всем студентам МГУ</p>
				</div>
				<div className='mission-card'>
					<Image alt='' src='/svg/back.svg' width={30} height={30}></Image>
					<p>Возврат в течение 3 дней с момента покупки</p>
				</div>
				<div className='mission-card'>
					<Image alt='' src='/svg/fromStudents.svg' width={30} height={30}></Image>
					<p>Вся продукция разрабатывается студентами МГУ</p>
				</div>
				<div className='mission-card'>
					<Image alt='' src='/svg/deliver.svg' width={30} height={30}></Image>
					<p>Доставка по всему миру</p>
				</div>
			</div>
		</section>
	)
}

export default Mission
