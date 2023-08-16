import { useState, useEffect} from 'react' ;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {fetchDatafromApi} from "./utils/api" ;
import { useSelector, useDispatch } from 'react-redux' ;
import { getApiConfiguration } from './store/homeSlice.js';
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/home/Home.jsx";
import Details from "./pages/details/Details.jsx";
import SearchResults from "./pages/searchResults/SearchResults.jsx";
import Explore from "./pages/explore/Explore.jsx";
import ErrorPage from "./pages/404/ErrorPage.jsx";
function App() {
    const dispatch = useDispatch();
    const {url} = useSelector((state) => state.home);
    console.log(url);
    useEffect(() => {
        fetchApiConfig();
    }, []);
    const fetchApiConfig = () => {
        fetchDatafromApi("/configuration").then((res) => {
            console.log(res);
            const url = {
                backdrop: res.images.secure_base_url + "original",
                poster: res.images.secure_base_url + "original",
                profile: res.images.secure_base_url + "original",
            };
            dispatch(getApiConfiguration(url));
        });
    };
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:mediaType/:id" element={<Details />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/explore/:mediaType" element={<Explore />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
        {/* <Footer /> */}
    </BrowserRouter>
);
}
export default App;
