import axios from 'axios'
import React, { useEffect, useState } from 'react'

const LocationFilter = ({locationName, getNewLocation}) => {
  const [locationOptions, setLocationOptions] = useState()

  useEffect(() => {
    if (!locationName) return setLocationOptions()
    const URL = `https://rickandmortyapi.com/api/location?name=${locationName}`
    axios.get(URL)
    .then(res =>  setLocationOptions(res.data.results))
    .catch(err => console.log(err))
  }, [locationName])
  return (
    <ul className='location-list'>
      {
        locationOptions?.map(locationOptions => <li onClick={() => getNewLocation(locationOptions.url, locationOptions.name)} key={locationOptions.url}>{locationOptions.name}</li> )
      }
    </ul>
  )
}

export default LocationFilter
