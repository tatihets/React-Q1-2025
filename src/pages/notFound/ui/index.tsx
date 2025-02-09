import NotFoundImg from '../../../assets/images/page-not-found.png';
import './index.css';

export const NotFound = () => {
  return (
    <div className="not-found">
      <img src={NotFoundImg} alt="404 error" />
    </div>
  );
};
