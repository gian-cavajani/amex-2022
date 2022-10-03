const Notification = ({ message }) => {
  if (message.code === null) {
    return null;
  } else if (message.code === 'error') {
    return (
      <div className="error row col-2 offset-5 text-center">
        {message.message}
      </div>
    );
  } else if (message.code === 'ok') {
    return <div className="ok row col-2 offset-5">{message.message}</div>;
  }
};

export default Notification;
