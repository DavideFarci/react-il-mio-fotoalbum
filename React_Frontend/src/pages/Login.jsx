import { useState } from 'react';
import { handleInputChange } from '../utilities/handleInputChange';
import { useAuth } from '../contexts/AuthContext';
import { fetchApi } from '../utilities/fetchApi';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { handleLogin } = useAuth();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const onLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      // chiamo l'endpoint di login
      const resp = await fetchApi('/login', 'POST', formValues);

      handleLogin(resp);

      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form
      onSubmit={onLoginSubmit}
      className="mx-auto mt-20 flex max-w-lg flex-col gap-2 rounded-lg border-4 border-red-900 bg-red-800 p-10 shadow-2xl shadow-red-950"
    >
      {error && <div>Errore nel login</div>}
      <h3 className="pb-5 text-2xl font-bold">Effettua il Login</h3>
      <input
        type="email"
        name="email"
        id="email"
        value={formValues.email}
        onChange={(e) => handleInputChange(e, 'email', setFormValues)}
        placeholder="email"
        className="rounded-md p-2 text-black shadow-lg"
      />{' '}
      <br />
      <input
        type="password"
        name="password"
        id="password"
        value={formValues.password}
        onChange={(e) => handleInputChange(e, 'password', setFormValues)}
        placeholder="password"
        className="rounded-md p-2 text-black shadow-lg"
      />
      <button
        type="submit"
        className="mt-8 self-center rounded-full border border-red-600 bg-red-800 px-4 py-2 font-semibold shadow-md duration-150 hover:bg-red-900 hover:px-6"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
