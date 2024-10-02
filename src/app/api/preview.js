import { getPreview } from "../_actions/previewSlider"

export default async function handler(req, res) {
	const {data, errMsg} = await getPreview()
	res(data)
	
}