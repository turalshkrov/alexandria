import { Oval } from "react-loader-spinner";
import { useAppSelector } from "../../../hooks/hook";
import "./Preloader.scss";

export default function Preloader() {
  const theme = useAppSelector(state => state.ThemeSlice.theme)
  return (
    <div className='page preloader-page'>
      <Oval
        width="60"
        height="60"
        color={theme === 'dark' ? '#9309BF' : '#F44A65'}
        secondaryColor=''
       />
    </div>
  )
}
