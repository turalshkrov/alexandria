

const EmptyLibrary = () => {
  return (
    <div className="empty-library d-f align-items-center justify-center mt-5">
      <div className="w-50 w-lg-25 empty-library-content d-f text-center">
        <img className="w-100 br-full" src="https://i.ibb.co/ChtxkK9/empty-library.jpg" alt="" />
        <span className="secondary mt-1">No books yet</span>
      </div>
    </div>
  )
}

export default EmptyLibrary;