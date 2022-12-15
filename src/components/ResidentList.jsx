import React from 'react'
import ResidentCard from './ResidentCard'

const ResidentList = ({residentsFilter}) => {
  return (
    <section className='location-residents'>
      {
        residentsFilter?.map(urlResident => (
        <ResidentCard key={urlResident} urlResident={urlResident} />
        ))
      }
    </section>
  )
}

export default ResidentList
