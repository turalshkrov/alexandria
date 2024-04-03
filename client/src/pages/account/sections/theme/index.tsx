import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { toggleTheme } from '@/redux/slices/ThemeSlice';

const ThemeSection = () => {
  const theme = useAppSelector(state => state.ThemeSlice.theme);
  const dispatch = useAppDispatch();
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  }
  return (
    <div className='section mt-3 mt-md-2 px-1' id='theme'>
      <h2 className='fw-regular'>Theme preferences</h2>
      <div className="br"></div>
      <p>How do you want to use Alexandria? Select dark or light theme.</p>
      <button className="account-btn br-1" onClick={handleToggleTheme}>
        Switch theme
      </button>
      <p className='mt-1 text-secondary info-text'>Current theme: {theme}</p>
    </div>
  )
}

export default ThemeSection;