import { defineStore } from 'pinia';
import axiosIns from '../axiosIns';
import { genre, GenresResponse, Movie, MovieDetail, movieResonse } from '../interfaces/Imovies';

export const useMovieStore = defineStore('movies', {
  state: () => ({
    movies: [],
    paginator: {
        currentPage: 1,
        totalPage: 1
    },
    searchParams: {
        query: null as string | null,
        include_adult: false,
        language: 'es-Es',
    },
    moviesSeached: [] as Movie[],
    genres: [] as genre[],
    movieDetail: null as MovieDetail | null,
    categories: [],
    currentSelected: null,
    trendingMovies: [] as Movie[]
  }),
  actions: {
    async search() {
        const res = await axiosIns.get<movieResonse>('/search/movie',{
            params: {
                page: this.paginator.currentPage,
                ...this.searchParams
            }
        })

        this.moviesSeached = res.data.results

        this.moviesSeached.forEach((movie,i) => {
            let genres = this.genres.filter(item => {
                return movie.genre_ids.includes(item.id)
            })

            this.moviesSeached[i].genres = genres
        })
    },
    async genres() {
        const res = await axiosIns.get<GenresResponse>('/genre/movie/list',{
            params: {
                language: 'es'
            }
        })

        // @ts-ignore
        this.genres = res.data.genres
    },
    async show(id:number) {
        const res = await axiosIns.get<MovieDetail>(`/movie/${id}`,{
            params: {
                language: 'es'
            }
        })

        // @ts-ignore
        this.movieDetail = res.data
    },
    async getTrending() {
        const res = await axiosIns.get<{results:Movie[],page:number,total_pages:number}>(`/trending/all/week`,{
            params: {
                language: 'es-Es',
                page: this.paginator.currentPage
            }
        })
        res.data.results.forEach(item => {
            this.trendingMovies.push(item)
        })
        this.paginator.currentPage = res.data.page
        this.paginator.totalPage = res.data.total_pages
    }
  },
});
