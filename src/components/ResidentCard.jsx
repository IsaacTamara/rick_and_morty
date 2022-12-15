import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ResidentCard = ({urlResident}) => {
  const [resident, setResident] = useState()

useEffect(() => {
  axios.get(urlResident)
  .then(res => setResident(res.data))
  .catch(err => console.log(err))
}, [])


  return (
    <article className='resident-card'>      
      <header className='resident-card_header'>
        <img src={resident?.image} alt="" />
        <div className='resident-card_status'>
          <div className={`circle ${resident?.status}`}></div>
          <span>{resident?.status}</span>
        </div>
      </header>
      <section className='resident-card-body'>
        <h2>{resident?.name}</h2>
        <hr />
        <ul>
          <li>RACE: <span>{resident?.species}</span></li>
          <li>SOURCE: <span>{resident?.origin.name}</span></li>
          <li>APPEARANCE IN EPISODES:<span>{resident?.episode.length}</span></li>
        </ul>
      </section>
    </article>
  )
}

export default ResidentCard
