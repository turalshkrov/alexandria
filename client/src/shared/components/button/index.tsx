import "./index.scss";

type ButtonStyle = 'solid' | 'outline' | 'link';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xxl';
type ButtonColor = 'primary' | 'dark' | 'light';
type ButtonType = "button" | "submit" | "reset" | undefined

type ButtonProps = {
  size?: ButtonSize,
  color?: ButtonColor,
  style?: ButtonStyle,
  children?: React.ReactNode,
  className?: string,
  type?: ButtonType,
  id?: string,
  onClick?: () => void,
}

export default function Button({ size, color='primary', style='solid', className='', type='button', id='', children, onClick }: ButtonProps) {
  className += size ? ' btn-' + size : ' ';
  return (
    <button
      id={id}
      type={type}
      className={`${className} btn-${style}-${color}`} 
      onClick={() => onClick?.()}>
      {children}
    </button>
  )
}
