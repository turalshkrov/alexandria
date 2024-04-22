
const Faq = () => {
  return (
    <div className="page about-page">
      <div className="container p-2 p-md-4">
        <h1>Alexandria: Frequently Asked Questions</h1>
        <div className="br"></div>
        <p>Welcome to the Alexandria FAQ page! Here, we've compiled answers to some of the most common questions our bookish users ask. 
          If you can't find what you're looking for here, feel free to reach out to us through our contact form or social media channels.</p>
        <h3 className="mt-3">General Questions:</h3>
        <ul>
          <li>
            <p className="fw-bold">What is Alexandria?</p>
            <p>Alexandria is a free online platform for cataloging your personal book collection and exploring a vast world of books.</p>
          </li>
          <li>
            <p className="fw-bold">Is there a cost to use Alexandria?</p>
            <p>No, Alexandria is completely free to use! You can catalog your books, discover new reads, and participate in our online community without any charges.</p>
          </li>
          <li>
            <p className="fw-bold">What devices can I use Alexandria on?</p>
            <p>Alexandria is accessible from any device with an internet connection, including computers, smartphones, and tablets.</p>
          </li>
        </ul>
        <h3 className="mt-3">Cataloging Your Collection:</h3>
        <ul>
          <li>
            <p className="fw-bold">How do I add books to my collection?</p>
            <p>You can add books to your collection by manually entering the details or scanning the ISBN barcode with your device's camera.</p>
          </li>
          <li>
            <p className="fw-bold">Can I categorize my books?</p>
            <p>Absolutely! Alexandria allows you to create custom categories and shelves to organize your collection by genre, author, read status, or any other criteria that works for you.</p>
          </li>
          <li>
            <p className="fw-bold">Can I track my reading progress?</p>
            <p>Yes! You can mark books as "read," "currently reading," or "to-read" to keep tabs on your progress and plan your next literary adventure.</p>
          </li>
        </ul>
        <h3 className="mt-3">Community and Features:</h3>
        <ul>
          <li>
            <p className="fw-bold">Does Alexandria have a social aspect?</p>
            <p>Yes! We have a thriving online community where you can connect with fellow book lovers, participate in discussions, and share your reading experiences.</p>
          </li>
          <li>
            <p className="fw-bold">Are there any limitations on what I can share in the community?</p>
            <p>We encourage respectful and engaging discussions. Please refer to our community guidelines for more information.</p>
          </li>
          <li>
            <p className="fw-bold">What other features does Alexandria offer?</p>
            <p>Alexandria allows you to explore annotations, character profiles, and author information to delve deeper into the books you're reading. You can also create thematic lists around specific genres or interests.</p>
          </li>
        </ul>
        <p className="mt-3">We hope this FAQ page has been helpful! If you have any further questions, please don't hesitate to contact us.</p>
        <p className="mt-3">Happy reading!</p>
      </div>
    </div>
  )
}

export default Faq;
