/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookType, ReviewType } from "@/types";
import { getBookById, getBookReviews, rateBook } from "@/api/book";
import { IoIosStar } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import Preloader from "@/shared/components/preloader/Preloader";
import "./index.scss";
import { Rating } from "react-simple-star-rating";
import { toast } from "sonner";
import { updateBookReviewOnUi } from "@/redux/slices/userSlice";
import Review from "./review";

interface BookData {
  book: BookType | null,
  reviews: ReviewType[] | null,
  isLoading: boolean,
  error: unknown,
}

const BookPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState<BookData>({
    book: null,
    reviews: null,
    isLoading: false,
    error: null
  });
  const userReview = useAppSelector(state => state.userSlice.reviews?.find(review => review.book === data.book?._id));
  const theme = useAppSelector(state => state.ThemeSlice.theme);
  const [ newReview, setNewReview ] = useState({
    title: "",
    content: "",
    rating: userReview?.rating,
  });
  const handleRatingChange =(rate: number) => {
    setNewReview(state => ({ ...state, rating: rate }));
  };
  const handleSubmitRating = async () => {
    try {
      if (newReview.rating) {
        await rateBook(id || "", newReview.rating);
        dispatch(updateBookReviewOnUi({ book: id, review: newReview } ));
        toast.success('Rating updated');
      } else {
        toast.error('Your rating is empty');
      }
    } catch (error) {
      toast.error('Something get wrong');
    }
  };
  const handleReviewChange = (e: any) => {
    setNewReview(state => ({ ...state, [e.target.name]: e.target.value}));
  };
  const handleSubmitReview = async (e: any) => {
    e.preventDefault();
    try {
      if (newReview.rating) {
        await rateBook(id || "", newReview.rating, newReview.content, newReview.title);
        dispatch(updateBookReviewOnUi({ book: id, review: newReview } ));
        toast.success('Review updated');
      } else {
        toast.error('Your rating is empty');
      }
    } catch (error) {
      toast.error('Something get wrong');
    }
  };
  useEffect(() => {
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
  }, [id]);
  useEffect(() => {
    setNewReview({
      title: "",
      content: "",
      rating: userReview?.rating,
    })
  }, [ userReview?.content, userReview?.rating, userReview?.title ]);
  return (
    <>
    {
    data.isLoading ? <Preloader /> :
    <div className="page">
      <div className="container py-2">
        <div className="row align-items-start">
          <div className="col-12 col-md-4 col-lg-3 text-center book-container-left">
            <div className="book-cover-container" style={{ background: `url(${data.book?.cover})` }}>
            </div>
            <div className="book-actions mt-2">
              <button className="book-action-btn w-75">
                + Add to list
              </button>
              <div className="rating-stars mt-1">
                <Rating
                  onClick={handleRatingChange}
                  fillColor={theme === 'dark' ? '#9309BF' : '#F44A65'}
                  size={28}
                  initialValue={userReview?.rating}
                  allowTitleTag={false}
                />
              </div>
              <button
                className="book-action-btn w-75 mt-1"
                onClick={handleSubmitRating}>
                Rate this book
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
              <p>
                Genre:
                {
                  data.book?.genres.map(genre => (
                    <Link key={genre} to={`/genres/${genre}`} className="link-hover text-secondary ml-1">{genre}</Link>
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
            <div className="write review">
              <h3 className="fw-regular">Write a review</h3>
              <h4>Your rating</h4>
              <Rating
                  onClick={handleRatingChange}
                  fillColor={theme === 'dark' ? '#9309BF' : '#F44A65'}
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
                <button className="book-action-btn w-100 w-md-50" onClick={handleSubmitReview}>Write a review</button>
              </form>
            </div>
            <div className="rating-and-reviews">
              <h3 className="fw-regular">Rating & reviews</h3>
              {
                (data.reviews?.filter(review => review.content).length === 0) ?
                <div className="empty-review d-f justify-center py-3">
                  <h3 className="fw-regular">No review yet</h3>
                </div> :
                <div className="reviews-container py-2">
                  {
                    userReview &&
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