import './Card.css';

export default function Card({
  children,
  variant = 'default',
  hover = true,
  onClick,
  className = '',
  ...props
}) {
  return (
    <div
      className={`card card--${variant} ${hover ? 'card--hover' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardImage({ src, alt, aspect = '16/9', overlay = false }) {
  return (
    <div className="card__image-wrapper" style={{ aspectRatio: aspect }}>
      <img src={src} alt={alt} className="card__image" loading="lazy" />
      {overlay && <div className="card__image-overlay" />}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`card__content ${className}`}>{children}</div>;
}

export function CardBadge({ children, variant = 'default' }) {
  return <span className={`card__badge card__badge--${variant}`}>{children}</span>;
}
