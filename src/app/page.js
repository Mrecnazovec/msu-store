import Image from "next/image";
import { getProduct } from "./_actions/previewSlider";
import Hello from "./sections/hello/Hello";
import Mission from "./sections/mission/Mission";
import PreviewSlider from "./sections/previewSlider/PreviewSlider";
import './page.scss'
import ArticleSlider from "./components/articleProduct/articleSlider";

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


					<ArticleSlider data={data}/>
				</div>
			</section>

		</main>
	)
}
