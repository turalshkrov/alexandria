import "./index.scss";

type ButtonStyle = 'solid' | 'outline' | 'link';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xxl';
type ButtonColor = 'primary' | 'dark' | 'light';

type ButtonProps = {
  size?: ButtonSize,
  color?: ButtonColor,
  style?: ButtonStyle,
  children?: React.ReactNode,
  className?: string,
  onClick?: () => void,
}

export default function Button({ size, color='primary', style='solid', className='', children, onClick }: ButtonProps) {
  className += size ? ' btn-' + size : ' ';
  return (
    <button 
      className={`${className} btn-${style}-${color}`} 
      onClick={() => onClick?.()}>
      {children}
    </button>
  )
}
