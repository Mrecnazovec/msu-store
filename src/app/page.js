import { getProduct } from './_actions/previewSlider'
import ArticleProduct from './components/articleProduct/articleProduct'
import './page.scss'
import Banner from './sections/banner/Banner'
import Hello from './sections/hello/Hello'
import Mission from './sections/mission/Mission'
import PreviewSlider from './sections/previewSlider/PreviewSlider'

export const revalidate = 10

export default async function Home() {
	const { data, errMsg } = await getProduct()

	const hoodiesData = data.filter((item) => item.subCategories === 'Худи')
	const tShirtData = data.filter((item) => item.subCategories === 'Футболки')

	const bannerPath = [
		{
			path:'/svg/1.svg',
			href:'#shop'
		},
		{
			path:'/svg/2.svg',
			href:'#tShirt'
		},
		{
			path:'/svg/3.svg',
			href:''
		},
		{
			path:'/svg/4.svg',
			href:''
		},
	]

	return (
		<main className='mainPage'>
			<Banner data={bannerPath} />
			<Hello />
			<PreviewSlider />
			<Mission />

			<section id='shop' className='clothSection'>
				<div className='product container'>
					<h2 data-aos='fade-down' id='hoodies'>
						Худи
					</h2>

					<div className='cloth'>
						{hoodiesData.map((item, index) => (
							<ArticleProduct key={index} item={item} index={index} />
						))}
					</div>
				</div>
				<div className='product container'>
					<h2 data-aos='fade-down' id='tShirt'>
						Футболки
					</h2>

					<div className='cloth'>
						{tShirtData.map((item, index) => (
							<ArticleProduct key={index} item={item} index={index} />
						))}
					</div>
				</div>
			</section>
		</main>
	)
}
