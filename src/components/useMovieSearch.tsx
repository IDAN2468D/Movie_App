import { useState } from 'react';
import { searchMovies } from '../api/apicalls';

const useMovieSearch = () => {
    const [searchList, setSearchList] = useState<any[]>([]);

    const searchMoviesFunction = async (name: string) => {
        try {
            let response = await fetch(searchMovies(name));
            let json = await response.json()
            setSearchList(json.results)
        } catch (error) {
            console.log("Something went wrong in searchMoviesFunction", error)
        }
    }
    return { searchList, searchMoviesFunction };
}

export default useMovieSearch;
