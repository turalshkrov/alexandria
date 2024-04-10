import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthorType, BookType } from "@/types";
import { getAuthorBooks, getAuthorById } from "@/api/author";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { BiHeart, BiPlus, BiSolidHeart } from "react-icons/bi";
import { toast } from "sonner";
import { addFavoriteAuthor, removeFavoriteAuthor } from "@/redux/slices/userSlice";
import Preloader from "@/shared/components/preloader/Preloader";
import "./index.scss";
import { setSelectedBook } from "@/redux/slices/userListsSlice";
import { setIsOpen } from "@/redux/slices/ModalSlice";

interface AuthorPageState {
  author: AuthorType | null,
  books: BookType[] | null,
  isLoading: boolean,
  error: unknown
}

const AuthorPage = () => {
  const params = useParams();
  const isAuth = useAppSelector(state => state.authSlice.isAuth);
  const id = params.id || "";
  const isFavorite = useAppSelector(state => Boolean(state.userSlice.user?.favoriteAuthors?.find(book => book._id === id)));
  const [data, setData] = useState<AuthorPageState>({
    author: null,
    books: null,
    isLoading: false,
    error: null,
  });
  const dispatch = useAppDispatch();
  const handleAddFavorites = async () => {
    if (isFavorite) {
      toast.promise(dispatch(removeFavoriteAuthor(id)).unwrap(), {
        loading: 'Loading...',
        success: 'Author removed from favorites',
        error: 'Somethings get wrong'
      })
    } else {
      toast.promise(dispatch(addFavoriteAuthor(id)).unwrap(), {
        loading: 'Loading...',
        success: 'Author added to favorites',
        error: 'Somethings get wrong'
      });
    }
  }
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
        const author = await getAuthorById(id);
        const books = await getAuthorBooks(id);
        setData(state => ({ ...state, author, books, isLoading: false }));
      } catch (error) {
        setData(state => ({ ...state, error, isLoading: false }));
      }
    }
    getData();
  }, [id])
  return (
    <>
      {
        data.isLoading ?
          <Preloader /> :
          <div className="author-page page">
            <div className="container py-2">
              <div className="row align-items-start">
                <div className="col-12 col-md-4 col-lg-3 text-center book-container-left">
                  <div className="author-image-container w-50" style={{ background: `url(${data.author?.image})` }}>
                  </div>
                  {
                    isAuth &&
                    <div className="author-actions mt-1">
                      <button
                        className="author-action-btn w-75 mt-1"
                        onClick={handleAddFavorites}>
                        <div className="d-f align-items-center justify-center">
                          {
                            isFavorite ?
                              <>
                                <BiSolidHeart color="#dc3545" size={18} />
                                Favorite
                              </> :
                              <>
                                <BiHeart color="#dc3545" size={18} />
                                Add to favorites
                              </>
                          }
                        </div>
                      </button>
                    </div>
                  }
                </div>
                <div className="col-12 col-md-8 col-lg-9 mt-2 mt-md-0">
                  <h2 className="logo-font">{data.author?.name}</h2>
                  <div className="author-details mt-1">
                    <p className="m-0 text-secondary">Native name: {data.author?.nativeName}</p>
                    <p className="m-0 text-secondary">Born: {data.author?.born}</p>
                    {data.author?.died && <p className="m-0 text-secondary">Died: {data.author.died}</p>}
                    <p className="text-secondary">
                      Genre:
                      {
                        data.author?.genres.map(genre => (
                          <Link key={genre} to={`/genres/${genre}`} className="link-hover underline-link ml-1">{genre}</Link>
                        ))
                      }
                    </p>
                  </div>
                  <div className="author-info mt-1">
                    <p>{data.author?.authorInfo}</p>
                  </div>
                  <div className="author-books mt-3">
                    <h3 className="text-secondary">{data.author?.name}'s books</h3>
                    <div className="author-books-container my-2">
                      {
                        data.books?.map(book => (
                          <div key={book._id} className="author-book d-f w-100 align-items-center">
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
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default AuthorPage;