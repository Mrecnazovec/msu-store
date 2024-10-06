import { getProduct } from './_actions/previewSlider'
import Hello from './sections/hello/Hello'
import Mission from './sections/mission/Mission'
import PreviewSlider from './sections/previewSlider/PreviewSlider'
import './page.scss'
import ArticleProduct from './components/articleProduct/articleProduct'

export default async function Home() {
	const { data, errMsg } = await getProduct()

	const hoodiesData = data.filter(item => item.subCategories === 'Худи');


	return (
		<main className='mainPage'>
			<Hello />
			<PreviewSlider />
			{/* <Mission /> */}

			<section className='clothSection'>
				<div className='container'>
					<h2 id='hoodies'>Худи</h2>

					<div className='cloth'>
						{hoodiesData.map((item, index) => (
							<ArticleProduct key={index} item={item} index={index} />
						))}
					</div>
				</div>
			</section>
		</main>
	)
}
