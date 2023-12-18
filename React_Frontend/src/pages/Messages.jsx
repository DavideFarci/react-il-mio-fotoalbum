// import axios from 'axios';
import { useEffect, useState } from 'react';
import ShowMessage from '../components/messages/ShowMessage';
import { fetchApi } from '../utilities/fetchApi';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);
  const [messageToShow, setMessageToShow] = useState('');

  const getMessages = async () => {
    try {
      const _messages = await fetchApi('/email');
      setMessages(_messages);
    } catch (error) {
      console.log(error.messages);
    }
  };

  const handleMessage = (message) => {
    setMessageToShow(message);
    setShow(true);
  };

  const closeOverlay = () => {
    setShow(false);
    setMessageToShow('');
  };

  const deleteMessage = async (id) => {
    try {
      await fetchApi(`/email/${id}`, 'DELETE');
      getMessages();
    } catch (error) {
      console.log(error.messages);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <h1 className="py-8 text-center text-4xl font-bold">I tuoi messaggi</h1>

      <div className="relative overflow-x-auto px-4">
        <table className="w-full text-left text-sm text-white rtl:text-right">
          <thead className="bg-red-800/80 text-xs uppercase text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Messaggio
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Mittente
              </th>
              <th scope="col" className="px-6 py-3">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody>
            {messages.map((mess) => (
              <tr
                key={mess.id}
                className="border-b border-red-900 bg-red-800/30"
              >
                <th
                  scope="row"
                  className="font-mediumtext-white block max-w-[500px] overflow-hidden text-ellipsis whitespace-nowrap px-6 py-4"
                >
                  {mess.message}
                </th>
                <td className="px-6 py-4">{mess.email}</td>
                <td className="px-6 py-4">{mess.complete_name}</td>
                <td className="px-6 py-4">
                  <i
                    onClick={() => deleteMessage(mess.id)}
                    title="Elimina"
                    className="fa-solid fa-trash-can mr-3 text-red-500 duration-150 hover:scale-125 hover:cursor-pointer"
                  ></i>
                  <i
                    onClick={() => handleMessage(mess.message)}
                    title="Espandi"
                    className="fa-regular fa-eye text-green-500 duration-150 hover:scale-125 hover:cursor-pointer"
                  ></i>
                </td>
              </tr>
            ))}
            <ShowMessage
              message={messageToShow}
              show={show}
              onClosing={() => setShow(false)}
            />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Messages;
