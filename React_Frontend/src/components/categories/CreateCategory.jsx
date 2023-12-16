/* eslint-disable react/prop-types */
import { useState } from 'react';

const CreateCategory = ({ onSave }) => {
  const [newCategory, setNewCategory] = useState({ name: '' });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await onSave(newCategory);
    } catch (error) {
      console.log(error);
    }

    // NON SVUOTA IL FORM
    setNewCategory({ name: '' });
  };

  return (
    <>
      <h3 className="py-8 text-center text-2xl font-bold">Nuova Categoria</h3>
      <form onSubmit={handleFormSubmit}>
        {/* Name  */}
        <div className="mr-12 inline">
          <label htmlFor="name" className="mb-0.5 block font-semibold">
            Nome Categoria
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setNewCategory({ name: e.target.value })}
            className="max-w-lg rounded-md p-1 text-black shadow-md"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-red-600 px-4 py-1 hover:bg-red-800"
        >
          Aggiungi categoria
        </button>
      </form>
    </>
  );
};

export default CreateCategory;
