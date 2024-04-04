import { ReviewType } from '@/types';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

const Review = ({ data }: { data: ReviewType }) => {
  return (
    <div className='user-review row py-2'>
      <div className="col-3 col-lg-2">
        <div className="user-profile">
          <div className="user-profile-image-container br-full" style={{ background: `url(${data.user.profileImage})`}}></div>
          <Link to={`/users/${data.user._id}`} className=' user-name link-hover'>{data.user.name}</Link>
        </div>
      </div>
      <div className="col-9 col-lg-10 review-container pl-1">
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
        <h3 className='m-0 my-1'>{data.title}</h3>
        <p className="m-0">{data.content}</p>
      </div>
    </div>
  )
}

export default Review;