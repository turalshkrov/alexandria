import { Link } from "react-router-dom";
import { AuthorType } from "@/types";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/hook";
import "./index.scss";
import { getAuthors } from "@/api/author";
import { PulseLoader } from "react-spinners";
import { IoIosArrowDown } from "react-icons/io";


interface AuthorsResultState {
  authors: AuthorType[],
  isLoading: boolean,
  error: unknown,
}

const AuthorSearchResult = () => {
  const searchKeyword = useAppSelector(state => state.SearchSlice.searchKeyword);
  const searchFilter = useAppSelector(state => state.SearchSlice.searchFilter);
  const [ authorsResult, setAuthorsResult ] = useState<AuthorsResultState>({
    authors: [],
    isLoading: false,
    error: null,
  });
  const [page, setPage] = useState(1);
  useEffect(() => {
    const searchAuthors = async () => {
      setPage(1);
      try {
        setAuthorsResult(state => ({ ...state, isLoading: true }));
        const authors = await getAuthors(searchKeyword, 1);
        setAuthorsResult(state => ({ ...state, authors, isLoading: false }));
      } catch (error) {
        setAuthorsResult(state => ({ ...state, error: error }));
      }
    }
    searchAuthors();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);
  const getMoreResult = async () => {
    try {
      setAuthorsResult(state => ({ ...state, isLoading: true }));
      const authors = await getAuthors(searchKeyword, page + 1);
      setAuthorsResult(state => ({ ...state, authors: [ ...state.authors, ...authors ], isLoading: false }));
    } catch (error) {
      setAuthorsResult(state => ({ ...state, error: error }));
    }
  }
  const onClickMoreResult = async () => {
    await getMoreResult();
    setPage(page => page + 1);
  }
  return (
    <>
      {(searchFilter === 'authors' || searchFilter === 'all') &&
        <>
          <h2>Authors</h2>
          <div className="row result-container mb-2">
            {
              authorsResult.authors.map(data => {
                return (
                  <Link to={`authors/${data._id}`} className="w-100" key={data._id}>
                    <div className="author-search-result d-f align-items-center">
                      <div className="author-image-container">
                        <img src={data.image} alt="" className="author-image" />
                      </div>
                      <div className="ml-1">
                        <p className="m-0 link-hover fw-bold">{data.name}</p>
                      </div>
                    </div>
                  </Link>
                )
              })
            }
            {(!authorsResult.authors || !authorsResult.authors.length) && <p className="result-not-foun w-100 m-0 p-1">No result found</p>}
            <>
              {
                authorsResult.isLoading ?
                <p className="w-100 m-0 mt-1 p-1 d-f align-items-center justify-center books-loading">
                  <PulseLoader
                    size={10}
                    color="#656D76"
                    speedMultiplier={0.5}
                  />
                </p> :
                <p className="m-0 mt-1 p-1 fw-bold show-more text-secondary d-f align-items-center"
                  onClick={onClickMoreResult}>
                  Show more result
                  <IoIosArrowDown />
                </p>
              }
            </>
          </div>
        </>
      }
    </>
  )
}

export default AuthorSearchResult;