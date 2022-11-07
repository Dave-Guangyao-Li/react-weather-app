import { AsyncPaginate } from "react-select-async-paginate";
import React, { useState } from 'react';
import { geoApiOptions, GEO_API_URL } from "../../api";
const Search = ({ onSearchChange }) => {

	const [search, setSearch] = useState(null);

	// get major cities options data
	// see documentation: https://rapidapi.com/wft-geo-db/api/wft-geo-db
	const loadOptions = (inputValue) => {
		return fetch(`${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`
			, geoApiOptions)
			.then((response) => response.json())
			.then((response) => {

				return {
					// new object with required fields
					options: response.data.map((city) => {
						return {
							label: `${city.name}, ${city.countryCode}`,
							value: `${city.latitude} ${city.longitude}`,
						};
					})
				}

			})
	}


	// onchange handler for search input
	const handleOnChange = (searchData) => {
		setSearch(searchData); // set search data to state
		onSearchChange(searchData);
	}

	return (
		<AsyncPaginate // AsyncPaginate is a wrapper for react-select menu
			placeholder="Search for a city" // placeholder for search input
			debounceTimeout={600}
			value={search}
			loadOptions={loadOptions} // shows options
			onChange={handleOnChange}
		/>
	)
}

export default Search;