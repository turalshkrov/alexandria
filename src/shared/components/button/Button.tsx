import "./Buttons.scss";

type ButtonType = 'solid' | 'outline' | 'link';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xxl';
type ButtonColor = 'primary' | 'dark' | 'light';

type ButtonProps = {
  size?: ButtonSize,
  color?: ButtonColor,
  type?: ButtonType,
  children?: React.ReactNode,
  className?: string,
  onClick?: () => void,
}

export default function Button({ size, color='primary', type='solid', className='', children, onClick }: ButtonProps) {
  className += size ? ' btn-' + size : ' ';
  return (
    <button 
      className={`${className} btn-${type}-${color}`} 
      onClick={() => onClick?.()}>
      {children}
    </button>
  )
}
