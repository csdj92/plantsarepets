import React from 'react';

const PlantList = (props) => {
	const FavouriteComponent = props.favouriteComponent;

	return (
		<>
			{props.plants.map((p) => (
				<div className='image-container d-flex justify-content-start m-3'>
					<img src={p.image_url} alt='movie'></img>
					<div
						onClick={() => props.handleFavouritesClick(p)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default PlantList;