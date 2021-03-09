import {useState,useEffect} from 'react'
import {PlantList} from './components/PlantList'

const App = () => { 
  const [plants, setPlants] = useState([]);
  const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
  

  const getPlants = async (searchValue) => {
    const url = `https://trefle.io/api/v1/plants?token=c1ObDE_L7UVUlT9AJU9P5VquMLQT066arHcZpznD3sQ`
    
    const response = await fetch(url)
    const responseJson = await response.json()

    if (responseJson.Search){
      setPlants(responseJson.Search)
    }
  }

  useEffect(() => {
		getPlants(searchValue);
	}, [searchValue]);

  useEffect(() => {
		const plantFavourites = JSON.parse(
			localStorage.getItem('plant-favourites')
		);

		if (plantFavourites) {
			setFavourites(plantFavourites);
		}
	}, []);


  const saveToLocalStorage = (items) => {
		localStorage.setItem('plant-favourites', JSON.stringify(items));
	};

	const addFavouritePlants = (plants) => {
		const newFavouriteList = [...favourites, plants];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouritePlant = (plants) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.id !== plants.id
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

  return (
		<div className='container-fluid plant-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<plantsListHeading heading='plants' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<PlantList
					plants={plants}
					handleFavouritesClick={addFavouritePlants}
					favouriteComponent={AddFavourites}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<PlantListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<PlantList
					plants={favourites}
					handleFavouritesClick={removeFavouritePlant}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
		</div>
	);
 
   



}

export default App;
