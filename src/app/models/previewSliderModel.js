import { Schema, model, models } from 'mongoose'

const previewSliderSchema = new Schema({
	imgPath: Array,
})

const previewSliderModel = models?.previewslider || model('previewslider', previewSliderSchema)

export default previewSliderModel
