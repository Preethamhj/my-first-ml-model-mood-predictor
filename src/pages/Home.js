import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'
import SmoothieCard from '../components/SmoothieCard'

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()

      if (error) {
        setFetchError('Could not fetch the smoothies')
        console.log(error)
        setSmoothies(null)
      }
      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }
    }
    fetchSmoothies()
  }, [])

  return (

    <div className = "pagehome">  
    {
      fetchError && <p className="error">{fetchError}</p>   
      {smoothies && (
        <div className= "Smoothies">
          {smoothies.map((smoothie) => (
            <SmoothieCard smoothie={smoothie} key={smoothie.id} />
          ))}
        </div>    
      )}
      </div>
    }
  )

  export default Home