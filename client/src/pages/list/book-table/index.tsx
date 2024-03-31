import { BookType } from "@/types";
import { Link } from "react-router-dom";
  import { FaRegCircleXmark } from "react-icons/fa6";
import { useAppSelector } from "@/hooks/hook";
import Button from "@/shared/components/button";
import './index.scss';  

const BookTable = ({ data }: { data: BookType[] }) => {
  const theme = useAppSelector(state => state.ThemeSlice.theme);

  const columns = [ 
    { label: 'Title', class: ''},
    { label: 'Author', class: 'd-n d-md-b' },
    { label: 'Actions', class: '' }
  ];
  return (
    <table className="book-table w-100 mx-md-2 mx-lg-3">
      <thead>
        <tr>
          { columns.map(column => ( <th key={column.label} className={column.class}>{column.label}</th> )) }
        </tr>
      </thead>
      <tbody>
        {
          data.map(book => (
            <tr key={book._id}>
              <td className="d-f align-items-center mr-1 title-td">
                <div className="book-cover-container">
                  <img src={book.cover} alt="" className="book-cover" />
                </div>
                <div className="td-right">
                  <Link to={`/books/${book._id}`} className="link-hover fw-bold">
                    {book.title}
                  </Link>
                  <p className="publish-date text-secondary m-0">
                    {book.published}
                  </p>
                </div>
              </td>
              <td className="author-td">
                <Link to={`/authors/${book.author._id}`} className="text-secondary link-hover book-author">
                  {book.author.name}
                </Link>
              </td>
              <td className="actions-td">
                <Button style="link" color={theme === 'dark' ? 'light' : 'dark'} className="p-0 book-action-btn d-f align-items-center">
                  <FaRegCircleXmark/>
                  Remove
                </Button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default BookTable;