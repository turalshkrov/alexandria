import { ReviewType } from '@/types';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

const Review = ({ data }: { data: ReviewType }) => {
  return (
    <>
    {
      data && data.user &&
      <div className='user-review row py-2'>
        <div className=" col-12 col-md-3 col-lg-2">
          <div className="user-profile d-f d-md-b align-items-center mb-1 mb-md-0">
            <div className="user-profile-image-container br-full mb-md-1" style={{ background: `url(${data.user.profileImage})`}}></div>
            <Link to={`/users/${data.user._id}`} className='ml-1 mb-1 ml-md-0 user-name link-hover'>{data.user.name}</Link>
          </div>
        </div>
        <div className="col-12 col-md-9 col-lg-10 review-container pl-md-1">
          <div className="review-header d-f align-items-center justify-space-between">
            <Rating
              readonly
              initialValue={data.rating}
              size={16}
            />
            <div className="review-date text-secondary">
              {new Date(String(data.date)).toDateString()}
            </div>
          </div>
          <h4 className="m-0">{data.title}</h4>
          <p className="m-0 review-content">{data.content}</p>
        </div>
      </div>
    }
    </>
  )
}

export default Review;