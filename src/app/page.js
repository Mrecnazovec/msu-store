import Image from "next/image";
import { getProduct } from "./_actions/previewSlider";
import Hello from "./sections/hello/Hello";
import Mission from "./sections/mission/Mission";
import PreviewSlider from "./sections/previewSlider/PreviewSlider";
import ArticleProduct from "./components/articleProduct/articleProduct";
import './page.scss'

export default async function Home() {

	const {data, errMsg} = await getProduct()

	return (
		<main className="mainPage">
			<Hello/>
			<PreviewSlider/>
			<Mission/>

			<section className="clothSection">
				<div className="container">
					<h2>Одежда</h2>
					<div className="cloth">
						{data.map((item, index)=>(
							<ArticleProduct key={index} item={item}/>
						))}
					</div>
				</div>
			</section>

		</main>
	)
}
