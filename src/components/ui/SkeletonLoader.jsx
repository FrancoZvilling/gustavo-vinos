import './SkeletonLoader.css';

export function SkeletonCard({ aspect = '16/9' }) {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton--image" style={{ aspectRatio: aspect }} />
      <div className="skeleton-card__body">
        <div className="skeleton skeleton--badge" />
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--text" />
        <div className="skeleton skeleton--text skeleton--text-short" />
      </div>
    </div>
  );
}

export function SkeletonLine({ width = '100%', height = '16px' }) {
  return <div className="skeleton" style={{ width, height, borderRadius: 'var(--radius-sm)' }} />;
}

export function SkeletonArticle() {
  return (
    <div className="skeleton-article">
      <div className="skeleton skeleton--hero" />
      <div className="skeleton-article__body">
        <div className="skeleton skeleton--title-lg" />
        <div className="skeleton skeleton--text" />
        <div className="skeleton skeleton--text" />
        <div className="skeleton skeleton--text skeleton--text-short" />
      </div>
    </div>
  );
}
