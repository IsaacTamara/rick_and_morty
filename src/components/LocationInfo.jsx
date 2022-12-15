import React from 'react'

const LocationInfo = ({location}) => {
  return (
    <article className='section-informatio'>
      <ul className='section-informatio_location'>
        <li>
          Name:<br/> <span>{location?.name}</span>
        </li>
        <li>
          Type:<br/><span>{location?.type}</span>
        </li>
        <li>
          Dimension:<br/><span>{location?.dimension}</span>
        </li>
        <li>
          Population:<br/><span>{location?.residents.length}</span>
        </li>
      </ul>
    </article>
  )
}

export default LocationInfo
