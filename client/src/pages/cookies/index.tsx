import { Link } from "react-router-dom";
import { Checkbox } from 'antd';

const Cookies = () => {
  return (
    <div className="page about-page">
      <div className="container p-2 p-md-4">
        <h1>Manage Your Cookie Preferences on Alexandria</h1>
        <div className="br"></div>
        <p>At Alexandria, we respect your privacy and want to give you control over your browsing experience. This page allows you to manage the cookies used on our website.</p>
        <h3 className="mt-3">What are Cookies?</h3>
        <p>Cookies are small text files that websites store on your device (computer, phone, tablet) when you visit them. 
          These files allow websites to remember your preferences and actions for a certain period of time, 
          so you don't have to keep re-entering them whenever you come back to the site or browse from one page to another.</p>
        <h3 className="mt-3">What Types of Cookies Does Alexandria Use?</h3>
        <p>We use two main types of cookies on Alexandria:</p>
        <ul>
          <li>Essential Cookies: These cookies are strictly necessary for the operation of our website. They enable features like user login and account management. These cookies cannot be disabled.</li>
          <li>Optional Cookies: These cookies are used to enhance your experience on our website. They allow us to personalize your browsing experience, remember your preferences, and provide you with relevant recommendations.</li>
        </ul>
        <h3 className="mt-3">Manage Your Cookie Preferences:</h3>
        <p>Here you can choose which optional cookies you want to enable or disable:</p>
        <ul>
          <li>
          Personalization Cookies: These cookies allow us to personalize your experience on Alexandria by remembering your preferences, such as recently viewed books or reading progress. - <Checkbox></Checkbox>
          </li>
          <li>
          Analytics Cookies: These cookies help us understand how users interact with our website, so we can improve it and its functionality. - <Checkbox></Checkbox>
          </li>
        </ul>
        <h3 className="mt-3">How to Save Your Preferences:</h3>
        <p>Once you have made your selections, click the "Save Preferences" button below. Your preferences will be saved, and the corresponding cookies will be enabled or disabled accordingly.</p>
        <h3 className="mt-3">Please Note:</h3>
        <ul>
          <li>Disabling optional cookies may affect your experience on the website. For example, personalized recommendations may not be available.</li>
          <li>You can always change your cookie preferences at any time by revisiting this page.</li>
          <li>You can also manage cookies through your web browser settings.</li>
        </ul>
        <h3 className="mt-3">For More Information:</h3>
        <p>For more information about cookies and how we use them, please refer to our full <Link to='/privacy' className="underline-link">Privacy Policy.</Link></p>
        <p>We value your privacy!  By using this page to manage your cookie preferences, you are taking control of your browsing experience on Alexandria.</p>
      </div>
    </div>
  )
}

export default Cookies;