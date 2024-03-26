import { useParams } from "react-router-dom";
import "./index.scss";

const User = () => {
  const params = useParams();
  const userId = params.id;
  return (
    <div className='page' id="profile">
      <div className="container my-2">
        <div className="row">
          <div className="info p-1 col-12 col-md-3 row">
            <div className="profile-image br-full col-12"
              style={{ backgroundImage: "url('https://rb.gy/dklxyq')" }}>
            </div>
            <h1>{userId}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User;