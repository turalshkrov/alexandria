import SearchBrar from "./components/SearchBar";
import Filter from "./components/Filter";
import BrowseGenres from "./components/BrowseGenres";
import "./Search.scss";
import BookCard from "@/shared/components/book card/BookCard";

const result = [
  {
    data: {
      id: '1',
      title: 'Crime and Punishment',
      author: {
        id: '1',
        fullName: 'F. M. Dostoyevsky'
      },
      cover: 'https://m.media-amazon.com/images/I/71O2XIytdqL._AC_UF1000,1000_QL80_.jpg'
    }
  },
  {
    data: {
      id: '2',
      title: 'Crime and Punishment',
      author: {
        id: '1',
        fullName: 'F. M. Dostoyevsky'
      },
      cover: 'https://m.media-amazon.com/images/I/71O2XIytdqL._AC_UF1000,1000_QL80_.jpg'
    }
  },
  {
    data: {
      id: '3',
      title: 'Crime and Punishment',
      author: {
        id: '1',
        fullName: 'F. M. Dostoyevsky'
      },
      cover: 'https://m.media-amazon.com/images/I/71O2XIytdqL._AC_UF1000,1000_QL80_.jpg'
    }
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
                <div key={book.data.id} className="col-4 book-div">
                  <BookCard data={book.data}/>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
