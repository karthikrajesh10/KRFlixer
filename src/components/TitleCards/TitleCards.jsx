import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'



const TitleCards = ({title,category}) => {
  const[apiData,setApiData] = useState([]);
  const cardsRef = useRef();

  const url = `https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`;
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODE1NjlmMWVkODI1YTgyMzE0NmRiYWY3YTk3MzVkYSIsIm5iZiI6MTc0NzU4NjA4NS4wOTEsInN1YiI6IjY4MmEwYzI1MDc2MDVjYjJhNjBiZDVjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QnrNdPbqQmazlaAwpAlXBHPYPC1UjvGC49rZL2FXawA'
  }
};



  const handleWheel = (event)=>{
    event.preventDefault;
    cardsRef.current.scrollLeft += event.deltaY;

  }

  useEffect(()=>{

    fetch(url, options)
    .then(res => res.json())
    .then(json => setApiData(json.results))
    .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel',handleWheel);
  },[])
  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>

        })}
      </div>
    </div>
  )
}

export default TitleCards