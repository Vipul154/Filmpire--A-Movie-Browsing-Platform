// We are going to create a function to help us fetch data from the API TMDB.
import axios from "axios"
import { envVars } from "../config/envVars.js"

export const fetchFromTMDB = async (url) => {
    const options = {
        headers : {
            accept : 'application/json',
            Authorization : "Bearer " + envVars.TMDB_API_KEY
        }
    };

    //  Axios is a third party library for making the fetch requests and it provides easier syntax, also no need for .json() thing.

    const response = await axios.get(url, options)
    if (response.status != 200) {
        throw new Error("Failed to fetch data from TMDB : " + response.statusText);
    }
    return response.data;
}
