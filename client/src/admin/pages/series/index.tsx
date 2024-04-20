import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import Button from "@/shared/components/button";
import { SeriesType } from "@/types";
import { Table } from "antd";
import { Link } from "react-router-dom";
import "../users/index.scss";
import { setSelectedSeries } from "@/admin/redux/slices/seriesSlice";
import { setIsOpen } from "@/redux/slices/ModalSlice";

const SeriesDashboard = () => {
  const dispatch = useAppDispatch();
  const series = useAppSelector(state => state.seriesSlice.series);
  const handleEditClick = (series: SeriesType) => {
    dispatch(setSelectedSeries(series))
  }
  const handleDeleteClick = (series: SeriesType) => {
    dispatch(setSelectedSeries(series));
    dispatch(setIsOpen({
      id: 'confirmDeleteSeries',
      isOpen: true,
    }));
  }
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "",
      key: "action",
      render: (series: SeriesType) => {
        return (
          <>
            <Button style="link" onClick={() => handleEditClick(series)}>
              <Link to='series-form' className="book-action-btn">
                Edit
              </Link>
            </Button>
            <Button style="link" className="ml-1" onClick={() => handleDeleteClick(series)}>
              Delete
            </Button>
          </>
        )
      }
    }
  ]
  return (
    <div className='dashboard-content p-2'>
      <div className="dashboard-header d-f align-items-center justify-space-between">
        <h2>Series</h2>
        <Link to='series-form'>
          <button className="add-data p-1" onClick={() => {dispatch(setSelectedSeries(null))}}>
            + Add Series
          </button>
        </Link>
      </div>
      <Table columns={columns} dataSource={series || []}/>
    </div>
  )
}

export default SeriesDashboard;