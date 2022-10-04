import { Link } from 'react-router-dom';

const EndCard = ({ title, link, text }) => {
  return (
    <article>
      <hr />
      <h3>
        {title}
        {<Link to={link}> {text}</Link>}
      </h3>
    </article>
  );
};

export default EndCard;
