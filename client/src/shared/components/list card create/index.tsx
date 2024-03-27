import '../list card/index.scss';

const ListCardCreate = () => {
  return (
    <div className='list-item col-6 col-md-3 p-1 p-xxl-2'>
      <div className="list-card">
        <img src="https://rb.gy/cqvygl" alt="" className="w-100 br-1"/>
        <div className="list-card-footer">
          <div className="list-action">
            <p className="mb-0 create-list link-hover">
              Create
            </p>
            <p className="mb-0 create-list-secondary text-secondary">
              Add new list to library
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListCardCreate;