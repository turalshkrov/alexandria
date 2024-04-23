import Preloader from "@/shared/components/preloader/Preloader";
import BookCard from "@/shared/components/book-card";
import ListCard from "@/shared/components/list-card";
import "./index.scss";
import { useAppSelector } from "@/hooks/hook";

export default function Home() {
  const data = useAppSelector(state => state.homePageSlice)
  return (
    <>
    {
      data.isLoading ?
      <Preloader /> :
      <div className='page' id='home'>
        <div className="container py-2">
          <h1>Top Categories</h1>
          <h2 className="mt-3">Classics</h2>
          <div className="row books-container">
            {
              data.data.classics?.map(book => (
                <BookCard key={book._id} data={book}/>
              ))
            }
          </div>
          <h2 className="mt-3">Science</h2>
          <div className="row books-container">
            {
              data.data.science?.map(book => (
                <BookCard key={book._id} data={book}/>
              ))
            }
          </div>
          <h2 className="mt-3">Philosophy</h2>
          <div className="row books-container">
            {
              data.data.philosophy?.map(book => (
                <BookCard key={book._id} data={book}/>
              ))
            }
          </div>
          <h2 className="mt-3">Lists from Alexandria</h2>
          <div className="row">
            {
              data.data.lists?.map(list => (
                <ListCard key={list._id} list={list} type="home"/>
              ))
            }
          </div>
        </div>
      </div>
    }
    </>
  )
}
