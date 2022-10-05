const Notification = ({ message }) => {
  if (!message.code) {
    return null;
  }
  return (
    <div className={message.code === 'error' ? 'error' : 'ok'}>
      {message.message}
    </div>
  );
};

export default Notification;
