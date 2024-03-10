import SearchBrar from "./components/SearchBar";
import Filter from "./components/Filter";
import BrowseGenres from "./components/BrowseGenres";
import BookCard from "@/shared/components/book card";
import WriterCard from "@/shared/components/writer card/WriterCard";
import { useAppSelector } from "@/hooks/hook";
import "./index.scss";

const books = [
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
  },
];

const writers = [
  {
    id: '1',
    fullName: 'F. M. Dostoyevsky',
    image: 'https://render.fineartamerica.com/images/rendered/small/print/images/artworkimages/square/3/1-fyodor-dostoevsky-literary-legend-john-springfield.jpg'
  },
  {
    id: '2',
    fullName: 'Albert Camus',
    image: 'https://render.fineartamerica.com/images/rendered/small/print/images/artworkimages/square/1/nobel-prize-winning-writer-albert-camus-unknown-date-2015---unknown-date-2015-david-lee-guss.jpg'
  },
  {
    id: '3',
    fullName: 'Franz Kafka',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Kafka_portrait_square.jpg'
  },
  {
    id: '4',
    fullName: 'Lev Tolstoy',
    image: 'https://i1.wp.com/www.azadliq.info/wp-content/uploads/2020/08/leo-tolstoyjpg-1068x1068-1-1024x1024.jpg'
  }
]

export default function Search() {
  const searchFilter = useAppSelector(state => state.SearchSlice.searchFilter);
  return (
    <div className='page'>
      <div className="container">
        <SearchBrar />
        <Filter />
        <BrowseGenres />
        <div className="row">
          {
            searchFilter === 'books' || searchFilter === 'all' ? books.map(book => {
              return(
              <BookCard
                key={book.id}
                data={book}
              />
              )
            })
            : null
          }
        </div>
        <div className="row">
          {
            searchFilter === 'writers' || searchFilter === 'all' ? writers.map(writer => {
              return(
              <WriterCard 
                key={writer.id}
                data={writer}
              />
              )
            })
            : null
          }
        </div>
      </div>
    </div>
  )
}