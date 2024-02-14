import { useEffect, useState } from 'react';
import { upcomingMovies, newPlayingMovies, popularMovies } from '../api/apicalls';

const useMovieLists = () => {
    const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any>(undefined);
    const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
    const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);

    useEffect(() => {
        const getNowPlayingMoviesList = async () => {
            try {
                let response = await fetch(newPlayingMovies);
                let json = await response.json();
                setNowPlayingMoviesList([{ id: "dummy1" }, ...json.results, { id: "dummy2" }]);
            } catch (error) {
                console.log("Something went wrong in getNowPlayingMoviesList Function", error)
            }
        };

        const getUpcomingMoviesList = async () => {
            try {
                let response = await fetch(upcomingMovies);
                let json = await response.json();
                setUpcomingMoviesList(json.results);
            } catch (error) {
                console.log("Something went wrong in getUpcomingMoviesList Function", error)
            }
        };

        const getPopularMoviesList = async () => {
            try {
                let response = await fetch(popularMovies);
                let json = await response.json();
                setPopularMoviesList(json.results);
            } catch (error) {
                console.log("Something went wrong in getPopularMoviesList Function", error)
            }
        };

        getNowPlayingMoviesList();
        getUpcomingMoviesList();
        getPopularMoviesList();
    }, []);

    return { nowPlayingMoviesList, popularMoviesList, upcomingMoviesList };
};

export default useMovieLists;
