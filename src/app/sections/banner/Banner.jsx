'use client'

import Link from 'next/link'
import './banner.scss'
import Image from 'next/image'


const Banner = ({imgPath}) => {

	return (
		<section className='banner' data-aos="fade-down">
			<div className='container container-fluid'>
				<Link href='#shop'>
					<Image alt='' src={imgPath} width={1440} height={550}></Image>
				</Link>
			</div>
		</section>
	)
}

export default Banner
