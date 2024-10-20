'use client'

import Image from 'next/image'
import Link from 'next/link'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './banner.scss'
import './swiper.scss'

const Banner = ({ data }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  }

  return (
    <section className='banner' data-aos='fade-down'>
      <div className='container container-fluid'>
        <Slider {...settings} className='Slider'>
          {data.map((item, index) => (
            <div key={index}>
              <Link href={item.href}>
                <Image alt='' src={item.path} width={1440} height={550} placeholder="blur" blurDataURL={item.path}/>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default Banner
