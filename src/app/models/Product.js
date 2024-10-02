import { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema({
	title: String,
	description: String,
	price: Array,
	details: Array,
	categories: String,
	subCategories: String,
})

const ProductModel = models?.product || model('product', ProductSchema)

export default ProductModel
