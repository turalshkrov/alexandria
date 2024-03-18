import BookCard from "@/shared/components/book card";
import WriterCard from "@/shared/components/author card";
import { useAppSelector } from "@/hooks/hook";

const books = [
  {
    id: '1',
    title: 'Notes from Underground',
    userRating: 4,
    rating: 4.4,
    author: {
      id: '1',
      fullName: 'F. M. Dostoyevsky'
    },
    cover: 'https://m.media-amazon.com/images/I/61k2zPRyOiL._AC_UF894,1000_QL80_.jpg'
  },
  {
    id: '2',
    title: 'Gambler',
    rating: 4.0,
    author: {
      id: '1',
      fullName: 'F. M. Dostoyevsky'
    },
    cover: 'https://m.media-amazon.com/images/I/51MoYgOB4AL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '3',
    title: 'The Brothers Karamazov',
    rating: 4.9,
    author: {
      id: '1',
      fullName: 'F. M. Dostoyevsky'
    },
    cover: 'https://m.media-amazon.com/images/I/71OZJsgZzQL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '4',
    title: 'Humilated and Insulted',
    userRating: 4,
    rating: 5,
    author: {
      id: '1',
      fullName: 'F. M. Dostoyevsky'
    },
    cover: 'https://m.media-amazon.com/images/I/91eP1g1QFcL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '5',
    title: 'Notes from Underground',
    rating: 4.1,
    userRating: 5,
    author: {
      id: '1',
      fullName: 'F. M. Dostoyevsky'
    },
    cover: 'https://m.media-amazon.com/images/I/61k2zPRyOiL._AC_UF894,1000_QL80_.jpg'
  },
  {
    id: '6',
    title: 'Gambler',
    rating: 4.5,
    author: {
      id: '1',
      fullName: 'F. M. Dostoyevsky'
    },
    cover: 'https://m.media-amazon.com/images/I/51MoYgOB4AL._AC_UF1000,1000_QL80_.jpg'
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
  },
  {
    id: '5',
    fullName: 'F. M. Dostoyevsky',
    image: 'https://render.fineartamerica.com/images/rendered/small/print/images/artworkimages/square/3/1-fyodor-dostoevsky-literary-legend-john-springfield.jpg'
  },
  {
    id: '6',
    fullName: 'Albert Camus',
    image: 'https://render.fineartamerica.com/images/rendered/small/print/images/artworkimages/square/1/nobel-prize-winning-writer-albert-camus-unknown-date-2015---unknown-date-2015-david-lee-guss.jpg'
  },
]

const SearchResult = () => {
  const searchFilter = useAppSelector(state => state.SearchSlice.searchFilter);
  const searchKeyword = useAppSelector(state => state.SearchSlice.searchKeyword);

  return (
    <div className="search-result">
      {
        searchKeyword &&
        <>
          {
            (searchFilter === 'books' || searchFilter === 'all') &&
            <>
              <h1>Books</h1>
              <div className="row books-container mb-3">
                {
                  books.map(book => {
                    return (
                      <BookCard
                        key={book.id}
                        data={book}
                      />
                    )
                  })
                }
              </div>
            </>
          }
          {
            (searchFilter === 'writers' || searchFilter === 'all') &&
            <>
              <h1>Writers</h1>
              <div className="row">
                {
                  writers.map(writer => {
                    return (
                      <WriterCard
                        key={writer.id}
                        data={writer}
                      />
                    )
                  })
                }
              </div>
            </>
          }
        </>
      }
    </div>
  )
}

export default SearchResult;