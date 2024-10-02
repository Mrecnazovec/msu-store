import previewSliderModel from '../models/previewSliderModel'
import connectDB from '../config/database'
import ProductModel from '../models/Product';

export async function getPreview() {
	try {
		await connectDB();
		const data = JSON.parse(JSON.stringify(await previewSliderModel.find()));

		return { data };
	} catch (error) {
		console.error('Error fetching preview:', error.message); // Логирование ошибки
		return { errMsg: error.message };
	}
}

export async function getProduct() {
	try {
		await connectDB();
		const data = JSON.parse(JSON.stringify(await ProductModel.find()));

		return { data };
	} catch (error) {
		console.error('Error fetching preview:', error.message); // Логирование ошибки
		return { errMsg: error.message };
	}
}