/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookType, ReviewType } from "@/types";
import { addBookToFavorites, getBookById, getBookReviews, rateBook, removeBookFromFavorites } from "@/api/book";
import { IoIosStar } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { Rating } from "react-simple-star-rating";
import { toast } from "sonner";
import { addFavoriteBookOnUI, removeFavoriteBookOnUI, setSelectedBook, updateBookReviewOnUI } from "@/redux/slices/userSlice";
import { setIsOpen } from "@/redux/slices/ModalSlice";
import { BiHeart, BiPlus, BiSolidHeart } from "react-icons/bi";
import Preloader from "@/shared/components/preloader/Preloader";
import Review from "./review";
import "./index.scss";

interface BookData {
  book: BookType | null,
  reviews: ReviewType[] | null,
  isLoading: boolean,
  error: unknown,
}

const BookPage = () => {
  const params = useParams();
  const id = params.id;
  const isAuth = useAppSelector(state => state.authSlice.isAuth);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<BookData>({
    book: null,
    reviews: null,
    isLoading: false,
    error: null
  });
  const userReview = useAppSelector(state => state.userSlice.reviews?.find(review => review.book === data.book?._id));
  const isFavorite = useAppSelector(state => Boolean(state.userSlice.user?.favoriteBooks?.find(book => book._id === id)));
  const [ newReview, setNewReview ] = useState({
    title: userReview?.title,
    content: userReview?.content,
    rating: userReview?.rating,
  });
  const handleRatingChange =(rate: number) => {
    setNewReview(state => ({ ...state, rating: rate }));
  };
  const showAddToListModal = () => {
    dispatch(setIsOpen({
      id: 'addToList',
      isOpen: true,
    }));
  };
  const handleAddFavorites = async () => {
    try {
      if (isFavorite) {
        await removeBookFromFavorites(id || "");
        dispatch(removeFavoriteBookOnUI(id));
        toast.success('Book removed from favorites');
      } else {
        await addBookToFavorites(id || "");
        dispatch(addFavoriteBookOnUI(data.book));
        toast.success('Book added to favorites');
      }
    } catch (error) {
      toast.error('Somethings get wrong');
    }
  }
  const handleReviewChange = (e: any) => {
    setNewReview(state => ({ ...state, [e.target.name]: e.target.value}));
  };
  const handleSubmitReview = async (e: any) => {
    e.preventDefault();
    try {
      if (newReview.rating) {
        const review = await rateBook(id || "", newReview.rating, newReview.content, newReview.title);
        dispatch(updateBookReviewOnUI({ book: id, review } ));
        toast.success('Review updated');
      } else {
        toast.error('Rating is empty');
      }
    } catch (error) {
      toast.error('Something get wrong');
    }
  };
  useEffect(() => {
    dispatch(setSelectedBook(id));
    const getBook = async () => {
      try {
        setData(state => ({ ...state, isLoading: true }));
        const book = await getBookById(id || "");
        const reviews = await getBookReviews(id || "");
        setData(state => ({ ...state, book, reviews, isLoading: false }));
      } catch (error) {
        setData(state => ({ ...state, error, isLoading: false }));
      }
    }
    getBook();
  }, [dispatch, id]);
  useEffect(() => {
    setNewReview({
      title: userReview?.title,
      content: userReview?.content,
      rating: userReview?.rating,
    })
  }, [ userReview?.content, userReview?.rating, userReview?.title ]);
  return (
    <>
    {
    data.isLoading ? <Preloader /> :
    <div className="page book-page">
      <div className="container py-2">
        <div className="row align-items-start">
          <div className="col-12 col-md-4 col-lg-3 text-center book-container-left">
            <div className="book-cover-container" style={{ background: `url(${data.book?.cover})` }}>
            </div>
            <div className="book-actions mt-2">
              <button
                className="book-action-btn w-75 mt-1"
                onClick={handleAddFavorites}>
                <div className="d-f align-items-center justify-center">
                  {
                    isFavorite ?
                    <>
                      <BiSolidHeart color="#dc3545" size={18}/>
                      Favorite
                    </> :
                    <>
                      <BiHeart color="#dc3545" size={18}/>
                      Add to favorites
                    </>
                  }
                </div>
              </button>
              <button className="book-action-btn w-75 mt-1" onClick={showAddToListModal}>
                <div className="d-f align-items-center justify-center">
                  <BiPlus size={18}/> 
                  Add to list
                </div>
              </button>
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-9 mt-2 mt-md-0">
            <h2>{data.book?.title}</h2>
            <Link className="link-hover font-md" to={`/authors/${data.book?.author._id}`}>{data.book?.author.name}</Link>
            <div className="book-rating mt-1">
              <p className="d-f align-items-center rating-text font-md">
                Alexandria rating: <IoIosStar color='#f5c518' className="ml-1" /> {data.book?.rating}
                <span className="ml-2 text-secondary ratings-count">{data.book?.ratingsCount} rating</span>
              </p>
            </div>
            <div className="book-details mt-1">
              <p className="m-0 text-secondary">First published: {data.book?.published}</p>
              <p className="m-0 text-secondary">Original language: {data.book?.language}</p>
              <p className="m-0 text-secondary">Original title: {data.book?.originalTitle}</p>
              <p className="text-secondary">
                Genre:
                {
                  data.book?.genres.map(genre => (
                    <Link key={genre} to={`/genres/${genre}`} className="link-hover underline-link ml-1">{genre}</Link>
                  ))
                }
              </p>
            </div>
            <div className="book-description mt-1">
              <p>{data.book?.description}</p>
            </div>
            <div className="book-author-info my-2 py-2">
              <h3 className="fw-regular">About the author</h3>
              <div className="author-profile mt-2 d-f align-items-center">
                <div className="author-image-container br-full" style={{ background: `url(${data.book?.author.image})` }}>
                </div>
                <div className="ml-1 ml-md-1 author-name book-details">
                  <h4 className="m-0">
                    <Link to={`/authors/${data.book?.author._id}`} className="link-hover">
                      {data.book?.author.name}
                    </Link>
                  </h4>
                  <p className="text-secondary m-0">{data.book?.author.born}</p>
                </div>
              </div>
              <p className="mt-2">
                {data.book?.author.authorInfo}
              </p>
            </div>
            {
              isAuth &&
            <div className="write review">
              <h3 className="fw-regular">
                {
                  userReview?._id ?
                  "Edit your review" :
                  "Write a review"
                }
              </h3>
              <h4>Your rating</h4>
              <Rating
                  onClick={handleRatingChange}
                  size={28}
                  initialValue={userReview?.rating}
                  allowTitleTag={false}
                />
              <form className="form-control mt-1 review-form pb-2 mb-2">
                <div className="form-item">
                  <label htmlFor="review-title">Review header</label>
                  <input
                    name="title"
                    type="text"
                    id="review-title"
                    className="w-100 w-md-50"
                    value={newReview.title}
                    onChange={handleReviewChange}/>
                </div>
                <div className="form-item">
                  <label htmlFor="review-content">Review content</label>
                  <textarea
                    name="content"
                    id="review-content"
                    className="w-100 w-md-50"
                    cols={50}
                    rows={5}
                    value={newReview.content}
                    onChange={handleReviewChange}>
                  </textarea>
                </div>
                <button className="book-action-btn w-100 w-md-50" onClick={handleSubmitReview}>
                {
                  userReview?._id ?
                  "Edit your review" :
                  "Write a review"
                }
                </button>
              </form>
            </div>
            }
            <div className="rating-and-reviews">
              <h3 className="fw-regular">Rating & reviews</h3>
              {
                (data.reviews?.filter(review => review.content).length === 0) ?
                <div className="empty-review d-f justify-center py-2">
                  <h3 className="fw-regular text-secondary">No review yet</h3>
                </div> :
                <div className="reviews-container">
                  {
                    userReview && userReview?.user &&
                    <Review data={userReview}/>
                  }
                  {
                    data.reviews?.filter(review => review._id !== userReview?._id).map(review => (
                      <Review key={review._id} data={review} />
                    ))
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
    }
    </>
  )
}

export default BookPage;