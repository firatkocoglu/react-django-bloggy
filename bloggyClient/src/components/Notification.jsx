import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/Context';

const Notification = () => {
  const { notification, setNotification } = useContext(GlobalContext);

  const { result, message } = notification;

  const divClass =
    result === 'Success' ? 'successful-notification' : 'failed-notification';

  useEffect(() => {
    setTimeout(() => {
      setNotification({ message: '', result: '' });
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`notification ${divClass}`}>
      <img src='' alt='' />
      <p>{message}</p>
    </div>
  );
};

export default Notification;
