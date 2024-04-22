import { Link } from "react-router-dom";


const AboutSection = () => {
  return (
    <div className='section mt-3 mt-md-2 px-1' id="account">
      <h2 className='fw-regular'>About Alexandria</h2>
      <div className="br"></div>
      <h3 className="mt-2">Welcome to Alexandria</h3>
      <p>
        You can read more about app and our mission at <Link className="underline-link" to="/about">About page.</Link>
      </p>
      <h3 className="mt-2">Contact us</h3>
      <p>
        Feel free to share your thoughts and suggestions through our <Link className="underline-link" to="/contact">contact page</Link>, <Link className="underline-link" to="/community">community forum</Link>, or social media channels.
      </p>
      <h3 className="mt-2">
        Privacy
      </h3>
      <p>
        Get more information about our <Link className="underline-link" to='/privacy'>Privacy Statement.</Link>
      </p>
      <h3 className="mt-2">Coockies</h3>
      <p>
        Manage your <Link className="underline-link" to='/cookies'>cookie preferences</Link>
      </p>
      <h4 className="mt-2">Version</h4>
      <div className="br"></div>
      <p>1.0.0</p>
    </div>
  )
}

export default AboutSection;