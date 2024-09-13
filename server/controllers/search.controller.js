import {fetchFromTMDB} from "../services/tmdb.service.js";
import {User} from "../models/user.model.js"

export const searchPerson = async (req, res) => {
    const {query} = req.params;
    
    try {
        const response = await fetchFromTMDB (`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)
        

        if (response.results.length == 0) {
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push : {
                searchHistory : {
                    id : response.results[0].id,
                    image : response.results[0].profile_path,
                    title : response.results[0].name,
                    searchType : "person",
                    createdAt : new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
                }
            }
        })

        res.status(200).json({success : true, content : response.results})
    } catch (error) {
        console.log(`Error in Search Person Controller : ${error.message}`)
        res.status(500).json({success : false, message : "Internal Server Error"});
    }
}
export const searchMovie = async (req, res) => {
    const {query} = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
        
        if (response.results.length == 0) {
            res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push : {
                searchHistory : {
                    id : response.results[0].id,
                    image : response.results[0].poster_path,
                    title : response.results[0].title,
                    searchType : "movie",
                    createdAt : new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
                }
            }
        })

        res.status(200).json({success : true, content : response.results});
    } catch (error) {
        console.log(`Error in Search Movie Controller : ${error.message}`)
        res.status(500).json({success : false, message : "Internal Server Error"});
    }
}
export const searchTv = async (req, res) => {
    const {query} = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)
        if (response.results.length == 0) {
            return res.status(404).send(null)
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push : {
                searchHistory : {
                    id : response.results[0].id,
                    image : response.results[0].poster_path,
                    title : response.results[0].original_name,
                    searchType : "tv",
                    createdAt : new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() 
                }
            }
        })
        res.status(200).json({success : true, content : response.results});

    } catch (error) {
        console.log(`Error in Search TV Controller : ${error.message}`)
        res.status(500).json({success : false, message : "Internal Server Error"});
    }
}

export const getSearchHistory = async (req, res) => {
    try {
        res.status(200).json({success : true, content : req.user.searchHistory})
    } catch (error) {
        console.log(`Error in getSearchHistory Controller : ${error.message}`)
        res.status(500).json({success : false, message : "Internal Server Error"});
    }
}

export const removeItemFromSearchHistory = async (req, res) => {
    let {id} = req.params;
    // The type of req.params is by default string, and the database had Number as id type, so it does not call $pull operator. Now, we need to convert it to Number.
    id = parseInt(id);
    

    try {
         await User.findByIdAndUpdate(req.user._id, {
            // Pull and Push are mongoDB Operators that are used to add or remove something from an array document in mongoDB.
            $pull : {
                searchHistory : {id : id}
            }
         })

         res.status(200).json({success : true, message : "Item removed from search history"});
    } catch (error) {
        console.log(`Error in removeItemFromSearchHistory Controller : ${error.message}`)
        res.status(500).json({success : false, message : "Internal Server Error"});
    }
}