import { SeriesType } from "@/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSeriesById } from "@/api/series";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setSelectedBook } from "@/redux/slices/userListsSlice";
import { setIsOpen } from "@/redux/slices/ModalSlice";
import Preloader from "@/shared/components/preloader/Preloader";
import ErrorPage from "../error";
import "./index.scss";
import { BiPlus } from "react-icons/bi";

interface SeriesPageState {
  series: SeriesType | null,
  isLoading: boolean,
  error: unknown,
}

const SeriesPage = () => {
  const params = useParams();
  const id = params.id || "";
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.authSlice.isAuth);
  const [data, setData] = useState<SeriesPageState>({
    series: null,
    isLoading: false,
    error: null
  });
  const handleBookClick = (id: string) => {
    dispatch(setSelectedBook(id));
    dispatch(setIsOpen({
      id: "addToList",
      isOpen: true
    }))
  }
  useEffect(() => {
    const getData = async () => {
      try {
        setData(state => ({ ...state, isLoading: true }));
        const series = await getSeriesById(id);
        setData(state => ({ ...state, isLoading: false, series }));
      } catch (error) {
        setData(state => ({ ...state, error, isLoading: false }));
      }
    }
    getData();
  }, [id]);
  return (
    <>
      {
        data.isLoading ?
        <Preloader /> :
        data.error ?
        <ErrorPage /> :
        <div className="page series-page">
          <div className="container py-2">
            <div className="series-info pb-1">
              <h2 className="logo-font">
                {data.series?.title}
              </h2>
              <p className="mt-2">
                {data.series?.description}
              </p>
            </div>
            <div className="series-book-container">
              {
                data.series?.books.map(book => (
                  <div key={book._id} className="series-book d-f w-100 align-items-center">
                    <div className="book-cover-container">
                      <img src={book.cover} alt="" className="book-cover" />
                    </div>
                    <div className="book-info m-0 mr-1">
                      <Link to={`/books/${book._id}`}>
                        <p className="link-hover fw-bold m-0">
                          {book.title}
                        </p>
                      </Link>
                      <p className="text-secondary book-info-published m-0">
                        {book.published}
                      </p>
                      <p className="text-secondary book-info-author m-0">
                        {book.author.name}
                      </p>
                    </div>
                    {
                      isAuth &&
                      <div className="book-action">
                        <button className="book-action-btn d-f align-items-center" onClick={() => handleBookClick(book._id)}>
                          <BiPlus /> Add to list
                        </button>
                      </div>
                    }
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default SeriesPage;