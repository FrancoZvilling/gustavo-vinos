import { useReadingProgress } from '../../hooks/useReadingProgress';
import './ReadingProgress.css';

export default function ReadingProgress() {
  const progress = useReadingProgress();

  return (
    <div className="reading-progress" role="progressbar" aria-valuenow={Math.round(progress)}>
      <div
        className="reading-progress__bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
