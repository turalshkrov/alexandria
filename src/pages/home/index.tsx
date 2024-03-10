import Button from '@/shared/components/button';
import { useAppDispatch } from '@/hooks/hook';
import { toggleTheme } from '@/redux/slices/ThemeSlice';
import "./index.scss";


export default function Home() {
  // const theme = useAppSelector(state => state.ThemeSlice.theme);
  const dispatch = useAppDispatch();
  return (
    <div className='page' id='home'>
      <div className="container pt-1 p-b-3">
      
        <Button size='sm' color='primary' style='solid' onClick={() => dispatch(toggleTheme())}>Theme</Button>
        <h1>Home</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum accusantium fuga aliquam sunt repudiandae voluptate tempore illum eius maxime veritatis fugiat atque quisquam sapiente voluptas laboriosam repellendus eaque, sint molestias.</p>
        <h2 className='mt-3'>Subtitle</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum iure eveniet odio nobis quaerat libero voluptatibus sapiente adipisci culpa, cupiditate velit, repellat omnis quisquam distinctio alias perferendis nam ex in?</p>
        <h2 className='mt-3'>Subtitle</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum iure eveniet odio nobis quaerat libero voluptatibus sapiente adipisci culpa, cupiditate velit, repellat omnis quisquam distinctio alias perferendis nam ex in?</p>
      </div>
    </div>
  )
}
