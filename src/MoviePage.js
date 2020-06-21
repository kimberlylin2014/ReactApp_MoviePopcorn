import React, { Component } from 'react';
import axios from "axios";
import Form from "./Form";
import API from "./API";
import * as Helper from "./helper.js";
import Movie from "./Movie";
import "./MoviePage.css";
import MovieModal from './MovieModal';
import FavMoviesModal from "./FavMoviesModal";
import Header from "./Nav";

class MoviePage extends Component {
    constructor(props) {
        super(props)
        this.state = {resultsLoaded: null,
                      results: [],
                      pageNumOfResult: 1, 
                      searchUrl: null, 
                      indexToDisplayMovies: 0,
                      displayResults: [],
                      favorites: JSON.parse(window.localStorage.getItem("favorites") || "[]"),
                      showModal: false,
                      modalMovie: null,
                      showFavModal: false,
        }
        this.fetchData = this.fetchData.bind(this);
        this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
        this.displayResults = this.displayResults.bind(this);
        this.increaseVote = this.increaseVote.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openFavModal = this.openFavModal.bind(this);
        this.closeFavModal = this.closeFavModal.bind(this);
        this.addToFavList = this.addToFavList.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
    }
    async fetchData(newResult) { 
        try {
            // Start Loading Spinner
            this.setState({resultsLoaded: false});
            // Fetch movie with keyword
            let url = API.getSearchUrl(newResult.searchKeyword);
            let resp = await axios.get(url);
            let data = await Helper.validateResponse(resp);
            // Fetch each movie by ID
            let promises = await data.Search.map(async (movie) => {
                let urlWithMovieId  = API.getSearchByIdUrl(movie.imdbID);
                let resp = await axios.get(urlWithMovieId);
                let data = await Helper.validateResponse(resp);
                return data;
            });
            // When All Promises are resolved, make copy using spread operator and setState
            Promise.all(promises).then(data => {
                let newResults = data.map(movie => {
                    movie.votes = 0;
                    movie.favorite = false;
                    return movie;
                })
                this.setState({results: newResults, displayResults: data.slice(0,8), 
                               resultsLoaded: true, searchUrl: url, indexToDisplayMovies: 0}
                );    

            });
        }catch(e) {
            console.log(e);
        }   
    }
    async handleLoadMoreClick() {
        try {
             this.setState((currentState) => {
                return {pageNumOfResult: currentState.pageNumOfResult + 1,
                        indexToDisplayMovies: currentState.indexToDisplayMovies + 8
                }
            }, async () => {
                let newPageUrl = API.getMorePageUrl(this.state.searchUrl, this.state.pageNumOfResult)
                let resp = await axios.get(newPageUrl);
                let data = await Helper.validateResponse(resp);
                let promises = await data.Search.map(async (movie) => {
                    let urlWithMovieId  = API.getSearchByIdUrl(movie.imdbID);
                    let resp = await axios.get(urlWithMovieId);
                    let data = await Helper.validateResponse(resp);
                    return data;
                });
    
                // When All Promises are resolved, make copy using spread operator and setState
                Promise.all(promises).then(data => {
                    this.setState((currentState) => {
                        let newData = data.map(newMovie => {
                            newMovie.votes = 0;
                            newMovie.favorite = false;
                            return newMovie;
                        })
                        return {results: [...currentState.results, ...newData]}
                    }, async () => {
                        this.setState((currentState) => {
                            return { displayResults: [...currentState.displayResults, 
                                    ...currentState.results.slice(currentState.indexToDisplayMovies, currentState.indexToDisplayMovies + 8)]};
                        });
                    })
                });
            });
        }catch(e) {
            console.log(e);
        }
    }
    displayResults() {
        let movies = this.state.displayResults.map(movie => {
            movie.favorite = false;
            if(this.state.favorites.length > 0) {
                for(let i = 0; i < this.state.favorites.length; i++) {
                    if(this.state.favorites[i].imdbID === movie.imdbID) {
                        movie.favorite = true;
                        break;
                    }
                }
            }
            return <Movie 
                votes = {movie.votes}
                key = {movie.imdbID}
                id  = {movie.imdbID}
                title = {movie.Title}
                imgUrl = {movie.Poster}
                year = {movie.Year}
                favorite = {movie.favorite}
                rating = {parseFloat(movie.imdbRating)}
                increaseVote = {this.increaseVote}
                addToFavList = {this.addToFavList}
                openModal = {this.openModal}
            />
        })
        let loadingSpinner = <div className="spinner-border mt-5" role="status"><span className="sr-only">Loading...</span></div>
        let loadedResults = (
            <div>
                <div className="result row">
                    {movies}
                 </div>
                 <button className="btn btn-secondary mt-5" onClick={this.handleLoadMoreClick}>Load More</button>
            </div> 
        )
        let displayResult = "";
        if(this.state.resultsLoaded) {
            displayResult = loadedResults;
        }else if(this.state.resultsLoaded === false) {
            displayResult = loadingSpinner;
        } 
        return displayResult;
    }
    increaseVote(movieID, delta) {
        this.setState((currentState) => {
            let newMovies = currentState.results.map(movie => {
                if(movie.imdbID === movieID) {
                    return {...movie, votes: movie.votes + delta};
                }
                return movie;
            })
            let newDisplayMovies = currentState.displayResults.map(movie => {
                if(movie.imdbID === movieID) {
                    return {...movie, votes: movie.votes + delta};
                }
                return movie;
            })
            return {results: newMovies, displayResults: newDisplayMovies};
        });
    }
    closeModal() {
        this.setState({showModal: false});
    }
    openModal(movieID) {
        this.setState((currState) => (
            {showModal: true,
             modalMovie : currState.results.filter(movie => movie.imdbID === movieID)[0]
            }
        ));
    }
    openFavModal() {
        this.setState({showFavModal: true});
    }
    closeFavModal() {
        this.setState({showFavModal: false});
    }
    removeFavorite(movieID) {
        this.setState((currState) => {
            return {favorites: currState.favorites.filter(movie => movie.imdbID !== movieID)}
        }, () => {
            window.localStorage.setItem("favorites", JSON.stringify(this.state.favorites))
        });
    }
    addToFavList(movieID) {
        this.setState((currentState) => {
            let favMovie = currentState.results.filter(movie => movie.imdbID === movieID)
            return {favorites: [...currentState.favorites, ...favMovie]};
        }, () => {
            window.localStorage.setItem("favorites", JSON.stringify(this.state.favorites))
        })
    }
    render() {   
        let movieModalComponent =  <MovieModal 
                                        show = {this.state.showModal}
                                        onHide = {this.closeModal}
                                        movie = {this.state.modalMovie}
                                    />

        let favModalComponent = <FavMoviesModal 
                                        show = {this.state.showFavModal}
                                        onHide = {this.closeFavModal}
                                        favorites = {this.state.favorites}
                                        removeFavorite = {this.removeFavorite}
                                />
        return(
            <div className="MoviePage">
                {this.state.showModal ? movieModalComponent : ""}
                {this.state.showFavModal ? favModalComponent : ""}
                <Header 
                    openFavModal = {this.openFavModal}
                />
                <div id="form-section">
                    <h1 className="text-center m-5">Popcorn Movies</h1>
                    <Form 
                        fetchData = {this.fetchData}
                    />
                </div>
                <div id="movie-results" className="text-center">
                    {this.displayResults()}
                </div>
            </div>
        )
    }
}

export default MoviePage;