'use client'

import Link from 'next/link'
import './banner.scss'
import Image from 'next/image'
import Flickity from 'react-flickity-component'
import './swiper.scss'

const Banner = ({ data }) => {
	const flickityOptions = {
		initialIndex: 0,
		cellAlign: 'left',
		pageDots: true,
		arrowShape: 'M18.3333 11L3.66668 11M18.3333 11L14.6667 7.33334M18.3333 11L14.6667 14.6667 Z',
		autoPlay: 5000,
		pauseAutoPlayOnHover: false,
		imagesLoaded: true,
		lazyLoad: true
	}

	return (
		<section className='banner' data-aos='fade-down'>
			{/* <div className='container container-fluid'>
				<Link href={data[0].href}>
					<Image alt='' src={data[0].path} width={1440} height={550}></Image>
				</Link>
			</div> */}

			<div className='container container-fluid'>
				<Flickity className='Slider' elementType='div' options={flickityOptions} reloadOnUpdate static>
					{data.map((item, index) => (
						<Link key={index} href={item.href}>
						<Image alt='' src={item.path} width={1440} height={550}></Image>
					</Link>
					))}
				</Flickity>
			</div>
		</section>
	)
}

export default Banner
