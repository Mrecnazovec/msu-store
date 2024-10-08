import { getProduct } from './_actions/previewSlider'
import Hello from './sections/hello/Hello'
import PreviewSlider from './sections/previewSlider/PreviewSlider'
import './page.scss'
import ArticleProduct from './components/articleProduct/articleProduct'
import Banner from './sections/banner/Banner'
import Mission from './sections/mission/Mission'

export const revalidate = 10

export default async function Home() {
	const { data, errMsg } = await getProduct()

	const hoodiesData = data.filter((item) => item.subCategories === 'Худи')

	return (
		<main className='mainPage'>
			<Banner imgPath='/png/Заставка на сайт.png'/>
			<Hello />
			<PreviewSlider />
			<Mission />

			<section id='shop' className='clothSection'>
				<div className='container'>
					<h2 data-aos='fade-down' id='hoodies'>Худи</h2>

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
