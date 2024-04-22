/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './index.scss';
import { toast } from 'sonner';

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleChange = (e: any) => {
    setFormData(state => ({ ...state, [e.target.name]: e.target.value }));
  }
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.current) {
      emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form.current, import.meta.env.VITE_EMAILJS_KEY);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      toast.success('Message sent');
    }
  };
  return (
    <div className="page about-page">
      <div className="container p-2 p-md-4">
        <h1>Get in Touch with Alexandria!</h1>
        <div className="br"></div>
        <p>We're here to help! Whether you have a question, suggestion, or just want to chat about books, feel free to reach out to us using the methods below.</p>
        <h3 className="mt-3">Social Media:</h3>
        <p>Connect with us on social media and join the conversation!</p>
        <ul>
          <li><a href="" className='underline-link'>Facebook</a></li>
          <li><a href="" className='underline-link'>Twitter</a></li>
        </ul>
        <h3 className="mt-3">Contact Form:</h3>
        <p>For any inquiries, you can fill out the form below and we'll get back to you as soon as possible.</p>
        <form className="form-control mt-3" ref={form} onSubmit={sendEmail}>
          <div className="form-item">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required className="w-100 w-md-50"  value={formData.name} onChange={handleChange}/>
          </div>
          <div className="form-item">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" required className="w-100 w-md-50"  value={formData.email} onChange={handleChange}/>
          </div>
          <div className="form-item">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" className="w-100 w-md-50"  value={formData.subject} onChange={handleChange}/>
          </div>
          <div className="form-item">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" className="w-100 w-md-50 p-1 br-1" rows={8} value={formData.message} onChange={handleChange}/>
          </div>
          <div className="form-item">
            <button className="contact-submit-btn w-100 w-md-50">Submit</button>
          </div>
        </form>
        <h3 className="mt-3">Alexandria Team</h3>
        <p>Baku, Azerbaijan.</p>
        <h3 className="mt-3">Additional Information:</h3>
        <ul>
          <li>Website FAQs: Before reaching out, you might find the answer to your question in our comprehensive Frequently Asked Questions section: <Link to='/faq' className='underline-link'>FAQ Page</Link></li>
          <li>Report a Bug: If you encounter any technical issues while using Alexandria, please report them at: alexandria.library.app@gmail.com</li>
        </ul>
        <p className='mt-3'>We appreciate your feedback and look forward to hearing from you!</p>
      </div>
    </div>
  )
}

export default Contact;