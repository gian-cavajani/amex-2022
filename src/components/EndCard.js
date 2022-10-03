import { Link } from 'react-router-dom';

const EndCard = ({ title, link, text }) => {
  return (
    <div>
      <hr />
      <h3>
        {title}
        {<Link to={link}> {text}</Link>}
      </h3>
    </div>
  );
};

export default EndCard;
