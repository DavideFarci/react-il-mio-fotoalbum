// import axios from 'axios';
import { useEffect, useState } from 'react';
import CreateCategory from '../components/categories/createCategory';
import { fetchApi } from '../utilities/fetchApi';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const resp = await fetchApi('/categories');
      setCategories(resp);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addNewCategory = async (newCategory) => {
    try {
      await fetchApi('/categories', 'POST', newCategory);
    } catch (error) {
      console.log(error.message);
    }

    getCategories();
  };

  const deleteCategory = async (id) => {
    try {
      await fetchApi(`/categories/${id}`, 'DELETE');
    } catch (error) {
      console.log(error.message);
    }
    getCategories();
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h2 className="py-8 text-center text-4xl font-bold">
        Gestisci le Categorie
      </h2>
      <div className="mb-12 px-2">
        <CreateCategory onSave={addNewCategory} />
      </div>
      <div className="px-2">
        <h3 className="py-8 text-center text-2xl font-bold">
          Le Tue Categorie
        </h3>
        {categories.map((categ) => (
          <span
            key={categ.id}
            className="group relative mb-3 mr-3 inline-block rounded-full bg-red-900 px-4 py-1 text-sm"
          >
            {categ.name}
            <span
              onClick={() => deleteCategory(categ.id)}
              className="pointer-events-none absolute right-[-5px] top-[-5px] opacity-0 hover:cursor-pointer hover:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100"
            >
              <i className="fa-regular fa-circle-xmark text-xl"></i>
            </span>
          </span>
        ))}
      </div>
    </>
  );
};

export default Categories;
