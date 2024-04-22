import { useAppSelector } from "@/hooks/hook";
import "./index.scss";
import BookCard from "@/shared/components/book-card";

export default function Home() {
  const books = useAppSelector(state => state.booksSlice.books);
  return (
    <div className='page' id='home'>
      <div className="container py-2">
        <div className="home-page-hero d-f align-items-center">
          <img className="home-page-hero-books" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1639948376l/59109077.jpg" alt="" />
          <img className="home-page-hero-books" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1689947880l/6708.jpg" alt="" />
          <img className="home-page-hero-books" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1598823299l/42844155._SY475_.jpg" alt="" />
          <img className="home-page-hero-books" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1347350403l/817791.jpg" alt="" />
          <img className="home-page-hero-books" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1655988385l/40121378.jpg" alt="" />
        </div>
        <h1 className="mt-md-2">The best-selling books of all time</h1>
        <h2 className="mt-2 mt-md-3">Books from Alexandria</h2>
        <div className="row books-container">
          {
            books?.map(book => (
              <BookCard data={book}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}
