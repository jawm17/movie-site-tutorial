import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import playBtn from "../assets/playIcon.png";
import logo from "../assets/newmoviefav.png";
import movieTitles from "../assets/movieTitles.json";
import MovieThumbnail from "../components/MovieThumbnail";
import recommendedMovies from "../assets/recommendedMovies.json";
import "./landingStyle.css";

export default function Landing() {
    const navigate = useNavigate();
    const { requestedMovie } = useParams();
    const [movieSrc, setMovieSrc] = useState("");
    const [mobile, setMobile] = useState(false);
    const [title, setTitle] = useState("Loading...");
    const [description, setDescription] = useState("");
    const [moviePoster, setMoviePoster] = useState("");
    const [movieStarted, setMovieStarted] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (requestedMovie) {
            getMovie(requestedMovie);
        } else {
            getRandomMovie();
        }

        // check if mobile
        if ((/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))) {
            setMobile(true);
        }
    }, [requestedMovie]);

    useEffect(() => {
        setMovieStarted(false);
    }, [movieSrc]);

    function getRandomMovie() {
        const randomIndex = Math.floor(Math.random() * movieTitles.titles.length);
        const randomTitle = movieTitles.titles[randomIndex];
        getMovie(randomTitle);
    }

    async function getMovie(title) {
        const url = 'https://api.themoviedb.org/3/search/movie';
        const params = {
            query: title,
            include_adult: false,
            language: 'en-US',
            page: 1
        };
        const headers = {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzkxMTdmZTgxNjRhNTVjMGRhYTdlOTllOWVlZDIyOCIsInN1YiI6IjY1NWI5ZTBlMGI3MzE2MDBhZGFiYmYxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3QcjZ5qmzcgPf0D8jIO7eq4o2ejSm6GB_q-AXX6BPWU'
        };
        try {
            const { data } = await axios.get(url, { params, headers });
            console.log(data);
            if (data?.results?.length > 0) {
                setMovieSrc(`https://vidsrc.to/embed/movie/${data.results[0].id}`);
                setTitle(data.results[0].original_title);
                setDescription(data.results[0].overview);
                setMoviePoster("https://image.tmdb.org/t/p/original/" + data.results[0].backdrop_path)
            } else {
                getRandomMovie();
            }
        } catch (error) {

        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            submitSearch();
        }
    };

    function submitSearch(e) {
        if (search) {
            navigate("/" + search);
            setSearch("");
        }
    }

    return (
        <div>
            <div id="topBarOuter">
                <div id="topBarInner">
                    <div id="leftTop">
                        <div id="siteTitleFlex">
                        <div id="siteTitle">
                            <img id="siteLogo" src={logo}></img>
                            <div>
                                New Movie Now
                            </div>
                        </div>
                        </div>
                    </div>
                    <div id="rightTop">
                    <div id="inputOuter">
                            <input id="searchInput" value={search} onKeyDown={handleKeyPress} onChange={(e) => setSearch(e.target.value)}></input>
                            <svg id="searchIcon" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div id="landingOuter">
                <div id="landingInner">
                <div id="rightSide">
                        <div id="iFrameBorder">
                            {!movieStarted && moviePoster ?
                                <div onClick={() => setMovieStarted(true)}>
                                    <div id="playIconBg">
                                        <img src={playBtn} id="playIcon"></img>
                                    </div>
                                    <img id="moviePoster" src={moviePoster}></img>
                                </div>
                                : null}
                            {movieSrc ? mobile ? <iframe id="movieFrame" src={movieSrc} allowFullScreen sandbox="allow-same-origin allow-scripts"></iframe> : <iframe id="movieFrame" src={movieSrc} allowFullScreen></iframe> : null}
                        </div>
                        <div id="movieTitle">
                            {title}
                        </div>
                        <div id="movieDescription">
                            {description}
                        </div>
                    </div>
                    <div id="leftSide">
                        {recommendedMovies.movies.map(movie => {
                            return (
                                <MovieThumbnail
                                    key={movie.movieTitle}
                                    movie={movie}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}