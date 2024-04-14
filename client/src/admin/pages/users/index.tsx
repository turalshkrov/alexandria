import { setSelectedUser } from "@/admin/redux/slices/usersSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { UserType } from "@/types";
import { setIsOpen } from "@/redux/slices/ModalSlice";
import { Table } from "antd";
import ErrorPage from "@/pages/error";
import Button from "@/shared/components/button";
import "./index.scss";



const UsersDashboard = () => {
  const usersState = useAppSelector(state => state.usersSlice)
  const dispatch = useAppDispatch();

  const handleClick = (user: UserType) => {
    dispatch(setSelectedUser(user));
    dispatch(setIsOpen({
      id: 'userDetails',
      isOpen: true,
    }));
  }

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Created",
      key: "created",
      render: (user: UserType) => {
        return(
          new Date(user.createdAt).toLocaleDateString()
        )
      }
    },
    {
      title: "",
      key: "action",
      render: (user: UserType) => {
        return(
        <Button style="link" onClick={() => handleClick(user)}>
          Details
        </Button>
        )
      }
    }
  ];

  return (
    <>
      {
      usersState.error ?
        <ErrorPage /> :
        <div className='dashboard-content p-2'>
          <h2>Users</h2>
          <Table dataSource={usersState.users || []} columns={columns} />
        </div>
      }
    </>
  )
}

export default UsersDashboard;