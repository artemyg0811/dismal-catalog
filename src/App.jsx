import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CatalogSection from "./components/catalog/Block";

export default function App() {
	const [ data, setData ] = useState( {} )

	document.body.classList[ Object.keys( data ).length === 0 ? 'add' : 'remove' ]('is-hide')

	async function getData() {
		await fetch('./catalog-config.json')
		.then( res => res.json() )
		.then( catalogData => {
			setData( catalogData )
		} )
	}

	useEffect( () => { getData() }, [] )

	return (
		<div className={ `wrapper` }>
			<Header data={ data }></Header>
			<div className="content">
				<section className="section catalog">
					<div className="catalog__container">
						<div className="s-header">
							<div className="s-header__content">
								<h2 className="s-header__title">Каталог страниц</h2>
							</div>
						</div>
						<div className="catalog__body">
							{
								data?.list &&
								Object.entries( data.list ? data.list : {} ).map( ( section, index ) => {
									return <CatalogSection data={ section } key={ index }></CatalogSection>
								} )
							}
						</div>
					</div>
				</section>
			</div>
			<Footer data={ data }></Footer>
		</div>
	)
}