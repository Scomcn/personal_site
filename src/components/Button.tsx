import Link from 'next/link';
import styles from './Button.module.scss';

type ButtonType = 'primary' | 'secondary' | 'destructive';

interface ButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export default function Button({
  text,
  href,
  onClick,
  type = "primary",
  className = "",
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const typeClass = styles[type as keyof typeof styles];
  const buttonClasses = `${styles.button} ${typeClass} ${className}`.trim();

  if (href) {
    return (
      <Link 
        href={href} 
        onClick={onClick}
        className={buttonClasses}
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      type="button"
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
    >
      {text}
    </button>
  );
}

