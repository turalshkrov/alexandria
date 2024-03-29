import ListCard from "@/shared/components/list card";
import ListCardCreate from "@/shared/components/list card create";
import { ListType } from "@/types";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";

interface UserListProps {
  username: string,
  lists: ListType[],
  showCreate: boolean,
}

const UserLists = ({ username, lists, showCreate }: UserListProps) => {
  return (
    <div className="lists">
      <div className="favarotie-books-header mb-1 d-f align-items-center justify-space-between">
        <h3 className="m-0">{username}'s lists</h3>
        <Link to='/library' className="link-to-library d-f align-items-center justify-center link-hover">
          {username}'s library
          <HiOutlineExternalLink />
        </Link>
      </div>
      <div className="list-container row">
        {
          lists.filter((_, i) => i < 5).map(list => <ListCard key={list._id} list={list} />)
        }
        {showCreate && <ListCardCreate /> }
      </div>
    </div>
  )
}

export default UserLists;