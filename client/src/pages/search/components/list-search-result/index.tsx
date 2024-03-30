import { Link } from "react-router-dom";
import { ListType } from "@/types";
import "./index.scss";
import { useAppSelector } from "@/hooks/hook";
import { useEffect, useState } from "react";
import { getLists } from "@/api/list";
import { PulseLoader } from "react-spinners";
import { IoIosArrowDown } from "react-icons/io";

interface ListsResultState {
  lists: ListType[],
  isLoading: boolean,
  error: unknown,
}

const ListSearchResult = () => {
  const searchKeyword = useAppSelector(state => state.SearchSlice.searchKeyword);
  const searchFilter = useAppSelector(state => state.SearchSlice.searchFilter);
  const [listsResult, setListResult] = useState<ListsResultState>({
    lists: [],
    isLoading: false,
    error: null,
  });
  const [page, setPage] = useState(1);
  useEffect(() => {
    const searchAuthors = async () => {
      setPage(1);
      try {
        setListResult(state => ({ ...state, isLoading: true }));
        const lists = await getLists(searchKeyword, 1);
        setListResult(state => ({ ...state, lists, isLoading: false }));
      } catch (error) {
        setListResult(state => ({ ...state, error: error }));
      }
    }
    searchAuthors();
  }, [page, searchKeyword]);
  const getMoreResult = async () => {
    try {
      setListResult(state => ({ ...state, isLoading: true }));
      const authors = await getLists(searchKeyword, page + 1);
      setListResult(state => ({ ...state, lists: [ ...state.lists, ...authors ], isLoading: false }));
    } catch (error) {
      setListResult(state => ({ ...state, error: error }));
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
          <h2>Lists</h2>
          <div className="row result-container mb-2">
            {
              listsResult.lists.map(data => {
                return (
                  <Link to={`lists/${data._id}`} className="w-100" key={data._id}>
                    <div className="list-search-result d-f align-items-center">
                      <div className="list-cover-container">
                        <img src={data.cover || 'https://lh3.googleusercontent.com/drive-viewer/AKGpihZbn3AE3NQ3AnVS07A40OsfRKHWGIrbPYkuFbAmqHAXP7zlb8OTceLvYvBKXvmFh8En8hTvAk5tK3M-RkUI2wWxdJefuw=s2560'} alt="" className="list-cover" />
                      </div>
                      <div className="ml-1">
                        <p className="m-0 m-0 link-hover fw-bold">{data.title}</p>
                        <p className="m-0 text-secondary list-user">{data.user.name}</p>
                      </div>
                    </div>
                  </Link>
                )
              })
            }
            {(!listsResult.lists || !listsResult.lists.length) && <p className="result-not-foun w-100 m-0 p-1">No result found</p>}
            <>
              {
                listsResult.isLoading ?
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

export default ListSearchResult;