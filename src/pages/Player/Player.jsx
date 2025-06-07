import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const{id} = useParams();
  const navigate = useNavigate();

  const [apiData,setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    typeof:" "

  })

  const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODE1NjlmMWVkODI1YTgyMzE0NmRiYWY3YTk3MzVkYSIsIm5iZiI6MTc0NzU4NjA4NS4wOTEsInN1YiI6IjY4MmEwYzI1MDc2MDVjYjJhNjBiZDVjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QnrNdPbqQmazlaAwpAlXBHPYPC1UjvGC49rZL2FXawA'
    }
};

useEffect(()=>{
  
  fetch(url, options)
  .then(res => res.json())
  .then(json => setApiData(json.results[0]))
  .catch(err => console.error(err));

},[])




  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
      <iframe width='90%' height='90%' 
      src={`https://www.youtube.com/embed/${apiData.key}`}
      title='Trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
        
      </div>
    </div>
  )
}

export default Player