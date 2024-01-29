import Footer from "../../components/footer/Footer";
import BurningLibrary from "../../img/burning-library.png";

export default function About() {
  return (
    <div id="about">
      <div className="container p-2 p-md-4">
        <h1 className="page-title mb-3">Welcome to Alexandria</h1>
        <h2>About Us</h2>
        <p className="mb-2">At Alexandria, we believe in the transformative power of books and the boundless world of knowledge they open up to us. 
          Our online library and book cataloging app are designed to bring the joy of reading, discovery, 
          and organization to bibliophiles and knowledge seekers around the globe.</p>
        <h2>Our Mission</h2>
        <p><i>Alexandria is more than just a digital library; it's a passion project fueled by a love for literature and a commitment to fostering a community of lifelong learners.</i></p>
        <p className="mb-2">Our mission is to create a platform that not only allows you to explore a vast collection of books but also empowers you to curate your own personal library. 
          Whether you're a student, a scholar, or simply someone who loves to read, 
          Alexandria is here to enhance your reading experience and help you discover new worlds within the pages of a book.</p>
        <h2>The Inspiration Behind Alexandria</h2>
        <p><i>The name "Alexandria" pays homage to the ancient Library of Alexandria, a symbol of knowledge and learning in the ancient world.</i></p>
        <p className="mb-2">Just like its historical counterpart, our Alexandria aims to be a beacon of intellectual curiosity, a place where people can come together to share, discover, 
        and celebrate the written word. We believe that in the digital age, the spirit of the great libraries of the past can be reborn, fostering a global community connected by the love of books.</p>
        {/* <img src={BurningLibrary} alt="Burning Library" /> */}
      </div>
      <Footer />
    </div>
  )
}
