

const EmptyLibrary = () => {
  return (
    <div className="empty-library d-f align-items-center justify-center">
      <div className="w-25 empty-library-content d-f text-center">
        <img className="w-100 br-full" src="https://lh3.googleusercontent.com/drive-viewer/AKGpihbxKx86zabNqjbIjoZhVeJg6EG8ba_iMeBtbh49O9c61aMnYjWO9JmN10hCsWBqYD018PM0kxk2Gw8FDHk7iSImCPjC-Q=s2560" alt="" />
        <span className="secondary mt-1">No books yet</span>
      </div>
    </div>
  )
}

export default EmptyLibrary;