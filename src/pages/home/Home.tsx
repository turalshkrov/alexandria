import React, { useContext } from 'react'
import Footer from '../../components/footer/Footer'
import { ThemeContext } from '../../contexts/theme/ThemeContext'

export default function Home() {
  const theme = useContext(ThemeContext);
  return (
    <div className={`page-${theme?.theme}`}>
      <div className="container py-3">
        <button className="btn-solid-light" onClick={() => { theme?.toggleTheme() }}>Theme</button>
        <h1>Home</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum accusantium fuga aliquam sunt repudiandae voluptate tempore illum eius maxime veritatis fugiat atque quisquam sapiente voluptas laboriosam repellendus eaque, sint molestias.</p>
        <h2 className='mt-3'>Subtitle</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum iure eveniet odio nobis quaerat libero voluptatibus sapiente adipisci culpa, cupiditate velit, repellat omnis quisquam distinctio alias perferendis nam ex in?</p>
        <h2 className='mt-3'>Subtitle</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum iure eveniet odio nobis quaerat libero voluptatibus sapiente adipisci culpa, cupiditate velit, repellat omnis quisquam distinctio alias perferendis nam ex in?</p>
      </div>
      <Footer />
    </div>
  )
}
