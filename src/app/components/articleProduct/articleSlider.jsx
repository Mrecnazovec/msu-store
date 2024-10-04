'use client'

import ArticleProduct from './articleProduct'
import Flickity from 'react-flickity-component'

const flickityOptions = {
	initialIndex: 0,
	cellAlign: 'left',
	pageDots: false,
	draggable: true,
	arrowShape: 'M18.3333 11L3.66668 11M18.3333 11L14.6667 7.33334M18.3333 11L14.6667 14.6667 Z',
	watchCSS: true
}

const ArticleSlider = ({ data }) => {
	return (
		<Flickity className='cloth' elementType='div' disableImagesLoaded={false} options={flickityOptions} reloadOnUpdate static>
			{data.map((item, index) => (
				<ArticleProduct key={index} item={item} />
			))}
		</Flickity>
	)
}

export default ArticleSlider
