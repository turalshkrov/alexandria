import CreateList from "@/shared/components/create-list";
import ListCard from "@/shared/components/list-card";
import { ListType } from "@/types";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface UserListProps {
  username: string,
  lists: ListType[],
  showCreate: boolean,
}

const UserLists = ({ username, lists, showCreate }: UserListProps) => {
  const [ collapse, setCollapse ] = useState(true);
  const handleCollapse = () => {
    setCollapse(!collapse);
  }
  return (
    <div className="lists">
      <div className="lists-header mb-1 d-f align-items-center justify-space-between">
        <h3 className="m-0">{username}'s lists</h3>
        <p className="show-all d-f align-items-center justify-center link-hover" onClick={handleCollapse}>
          Show {collapse ? 'all' : 'less'}
          <IoIosArrowDown className={collapse ? "arrow" : "arrow arrow-up"}/>
        </p>
      </div>
      <div className="list-container row">
        {
          lists.filter((_, i) => i < (collapse ? showCreate ? 3 : 4 : lists.length)).map(list => <ListCard key={list._id} list={list} />)
        }
        {
          showCreate && <CreateList />
        }
      </div>
    </div>
  )
}

export default UserLists;