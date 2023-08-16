import React from 'react'
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from "../../../hooks/useFetch.jsx";
import { useSelector } from 'react-redux' ;
import Img from "../../../components/lazyLoadImage/Img.jsx"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper.jsx"
import "./styles.scss"
const HeroBanner = () => {
  const [background, setBackground] = useState("") ;
  const [query, setQuery] = useState("") ;
  const navigate = useNavigate() ;
  const {data, loading} = useFetch("/movie/top_rated") ;
  const {url} = useSelector((state)=>state.home) ;
  useEffect( () => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random()
      *20)]?.backdrop_path ; 
    setBackground(bg)
  }, [data])
  const searchQueryHandler = (e)=>{
    if( e.key === 'Enter' && query.length > 0 ){
      navigate(`/search/${query}`);
    }
  }
  return (
    <div className="heroBanner">
      { !loading && (<div className="backdrop-img">
        <Img src ={background}/>
      </div>)}
      <div className="opacityLayer"></div>
      <ContentWrapper>
      <div className="heroBannerContent">
          <span className="title">Hey there, Film Fanatic</span>
          <span className="subTitle">Embark on a Cinematic Adventure with The Filmatorium</span>
          <div className="searchInput">
            <input type="text" placeholder='Lights, Camera, Search!' 
             onChange={(e)=>setQuery(e.target.value)}
             onKeyUp={searchQueryHandler}/>
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div> 
  )
}

export default HeroBanner
