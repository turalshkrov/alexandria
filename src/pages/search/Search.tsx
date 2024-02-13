import SearchBrar from "./components/SearchBar";
import Filter from "./components/Filter";
import BrowseGenres from "./components/BrowseGenres";
import BookCard from "@/shared/components/book card/BookCard";
import "./Search.scss";

const result = [
  {
    id: '1',
    title: 'Notes from Underground',
    author: {
      id: '1',
      fullName: 'F. M. Dostoyevsky'
    },
    cover: 'https://m.media-amazon.com/images/I/61k2zPRyOiL._AC_UF894,1000_QL80_.jpg'
  },
  {
    id: '2',
    title: 'Gambler',
    author: {
      id: '1',
      fullName: 'F. M. Dostoyevsky'
    },
    cover: 'https://m.media-amazon.com/images/I/51MoYgOB4AL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '3',
    title: 'The Brothers Karamazov',
    author: {
      id: '1',
      fullName: 'F. M. Dostoyevsky'
    },
    cover: 'https://m.media-amazon.com/images/I/71OZJsgZzQL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '4',
    title: 'Humilated and Insulted',
    author: {
      id: '1',
      fullName: 'F. M. Dostoyevsky'
    },
    cover: 'https://m.media-amazon.com/images/I/91eP1g1QFcL._AC_UF1000,1000_QL80_.jpg'
  }
]

export default function Search() {
  return (
    <div className='page'>
      <div className="container">
        <SearchBrar />
        <Filter />
        <BrowseGenres />
        <div className="row">
          {
            result.map(book => {
              return(
              <BookCard
                key={book.id}
                data={book}
              />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
