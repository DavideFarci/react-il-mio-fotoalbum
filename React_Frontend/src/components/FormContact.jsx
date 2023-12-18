import { useState } from 'react';
import { fetchApi } from '../Utilities/fetchApi';

const initialData = {
  complete_name: '',
  email: '',
  message: '',
};

const FormContact = () => {
  const [formValues, setFormValues] = useState(initialData);
  const [success, setSuccess] = useState(false);

  const handleDataForm = (e, input) => {
    const { value } = e.target;

    setFormValues((oldValue) => {
      return {
        ...oldValue,
        [input]: value,
      };
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      await fetchApi('/email', 'POST', formValues);
      setFormValues(initialData);
      setSuccess(true);
      setInterval(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={sendMessage}>
      <h2 className="mb-6 text-left text-2xl font-bold">Contattaci</h2>
      {/* Nome Completo  */}
      <div className="mb-4 flex flex-col">
        <label htmlFor="complete_name" className="mb-0.5 font-semibold">
          Nome Completo
        </label>
        <input
          type="text"
          name="complete_name"
          id="complete_name"
          value={formValues.complete_name}
          onChange={(e) => handleDataForm(e, 'complete_name')}
          className="rounded-md p-1 text-black shadow-md"
        />
      </div>
      {/* Email  */}
      <div className="mb-4 flex flex-col">
        <label htmlFor="email" className="mb-0.5 font-semibold">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formValues.email}
          onChange={(e) => handleDataForm(e, 'email')}
          className="rounded-md p-1 text-black shadow-md"
        />
      </div>
      {/* Messaggio  */}
      <div className="mb-4 flex flex-col">
        <label htmlFor="message" className="mb-0.5 font-semibold">
          Messaggio
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="5"
          value={formValues.message}
          onChange={(e) => handleDataForm(e, 'message')}
          className="rounded-md p-1 text-black shadow-md"
        ></textarea>
      </div>
      <button
        type="submit"
        className="rounded-md bg-red-700 px-4 py-2 font-bold duration-150 hover:bg-red-600"
      >
        Invia
      </button>
      {success && (
        <div className="mt-3 rounded-md bg-green-600 px-3 py-1 text-center shadow-md">
          Messaggio inviato
        </div>
      )}
    </form>
  );
};

export default FormContact;
