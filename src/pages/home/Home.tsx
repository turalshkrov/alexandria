import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button';
import { useAppDispatch } from '../../hooks/hook';
import { toggleTheme } from '../../redux/slices/ThemeSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  return (
    <div className='page' id='home'>
      <div className="container py-3">
        <Button size='sm' color='primary' type='solid' onClick={() => dispatch(toggleTheme())}>Theme</Button>
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
