import React from 'react'
import PreviewSliderItem from './PreviewSlider.jsx'
import { getPreview } from '@/app/_actions/previewSlider.js'
const PreviewSlider = async() => {
	const {data, errMsg} = await getPreview()
	return (
		<PreviewSliderItem data={data}/>
	)
}

export default PreviewSlider