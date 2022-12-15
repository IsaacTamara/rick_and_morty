import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import ErrorMessage from './components/ErrorMessage'
import LocationFilter from './components/LocationFilter'
import LocationInfo from './components/LocationInfo'
import ResidentList from './components/ResidentList'
import getRandomNumber from './utils/getRandomNumber'

const RESIDENTS_PER_PAGE = 15

function App() {
  const [location, setLocation] = useState()
  const [locationName, setLocationName] = useState("")
  const [showError, setShowError] = useState(false)  
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [residentsFilter, setResidentsFilter] = useState([])

  const getDataDimencion = (idDimension) => {
    if (!idDimension) return alert("write the dimension to search")
    const URL = `https://rickandmortyapi.com/api/location/${idDimension}`
    axios.get(URL)
      .then(res => setLocation(res.data))
      .catch(err => {
        if(searchValue.value === location.name) return alert("actual page") 
        setShowError(true)
        setTimeout(() => {
          setShowError(false)
        }, 2000);
        console.log(err)
      })
  }  

  useEffect(() => {
    const randomDimension = getRandomNumber()
    getDataDimencion(randomDimension)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const dimensionsearch = e.target.searchValue.value
    getDataDimencion(dimensionsearch)
  }

  const handleChangeInput = e => {
    setLocationName(e.target.value)
  }

  const getNewLocation = (URL, name) => {
    setLocationName(name)
    axios.get(URL)
      .then(res => setLocation(res.data))
      .catch(err => console.log(err))
  }  

  const getAllPage = () => {
    const arrayPages = []
    for (let i = 1; i <= lastPage; i++) {
      arrayPages.push(i)      
    }
    return arrayPages
  }

  useEffect(() => {
    if(!location) return
    const quantityResidents = location.residents.length
    const quantityPages = Math.ceil(quantityResidents / RESIDENTS_PER_PAGE)
    setLastPage(quantityPages)
    setCurrentPage(1)    
  }, [location])

  useEffect(() => {
    const lastResidentCut = currentPage * RESIDENTS_PER_PAGE
    const firstResidentCut = lastResidentCut - RESIDENTS_PER_PAGE
    const newResidentsFilter = location?.residents.slice(firstResidentCut, lastResidentCut)
    setResidentsFilter(newResidentsFilter)
  }, [location, currentPage])

  const searchComparator = () => {
    if (locationName) {
      if (locationName === location.name) {
        return "disguise"
      }else{
        return "locationList"
      }
    }else{
      return "locationList"
    }
  }  

  return (
    <div className="App ">
      <header className='header-main'>
        <img className='header-main_img' src="https://acortar.link/54xl8z" alt="img" />
        <form className='header-main_form' onSubmit={handleSubmit} >
          <input 
            id='searchValue' 
            className='header-main_input' 
            value={locationName} 
            type="text" 
            placeholder='Search you dimension' 
            onChange={handleChangeInput} 
          />
          <button className='header-main_button' type='submit'>Search</button>
          {
            showError ? <ErrorMessage /> : ""
          }
        </form>
      </header>

      <nav className={searchComparator()}>
        <LocationFilter locationName={locationName} getNewLocation={getNewLocation}/>
      </nav>
      
      <LocationInfo location={location} />
      
      <ResidentList residentsFilter={residentsFilter} />

      <ul className='list-pages'>
        {
          getAllPage().map(page => (
            <li 
              className={currentPage === page ? "currentPage" : ""}
              onClick={() => setCurrentPage(page)} key={page}
              >{page}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
