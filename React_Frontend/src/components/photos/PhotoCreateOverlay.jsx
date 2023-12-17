/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchApi } from '../../utilities/fetchApi';

const initialData = {
  title: '',
  image: null,
  description: '',
  categories: [],
  visible: false,
};

const PostCreateOverlay = ({ show, onClosing, photoToEdit, onSave, isNew }) => {
  // States
  const [categories, setCategories] = useState([]);
  const [formValues, setFormValues] = useState(initialData);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState(false);

  // Methods
  const getCategories = async () => {
    try {
      const _categories = await fetchApi('/categories');
      setCategories(_categories);
    } catch (error) {
      console.error('Errore durante il recupero delle categorie:', error);
    }
  };

  // Funzione per ottenere i dati inseriti negli input e settare lo stato formValues per salvare i dati
  const handleDataForm = (e, input) => {
    let value = e.target.value;
    const checked = e.target.checked;

    let newValue = e.target.type === 'checkbox' ? checked : value;

    if (input === 'image') {
      newValue = e.target.files[0];
    }

    if (input === 'categories') {
      let currentCateg = formValues.categories;

      if (checked) {
        currentCateg.push(+value);
      } else {
        currentCateg = currentCateg.filter((categId) => categId !== value);
      }
      newValue = currentCateg;
    }

    if (input === 'visible') {
      if (checked) {
        setFormValues((oldValue) => {
          return {
            ...oldValue,
            [input]: true,
          };
        });
      } else {
        setFormValues((oldValue) => {
          return {
            ...oldValue,
            [input]: false,
          };
        });
      }
    }

    setFormValues((oldValue) => {
      return {
        ...oldValue,
        [input]: newValue,
      };
    });
  };

  //   ----------------------------------------------------------------------------  VEDI SE RIESCI A ELIMINARE QUESTA FUNZIONE E USARE FORMVALUE
  const selectCategories = (categ) => {
    if (selectedCategories.includes(categ)) {
      setSelectedCategories(
        selectedCategories.filter((categId) => categId !== categ),
      );
    } else {
      setSelectedCategories([...selectedCategories, categ]);
    }
  };

  // Funzione per inviare i dati e inviarli al server (passata come prop a PostsList)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formDataTOSend = new FormData();
    Object.keys(formValues).forEach((key) => {
      formDataTOSend.append(key, formValues[key]);
    });

    try {
      await onSave(isNew ? formValues : formDataTOSend);
      setFormValues(initialData);
      onClosing();
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  // Funz. per ottenere l'anteprima dell'immagine selezionata nel form
  const handleImgPreview = () => {
    return typeof formValues.image === 'string'
      ? 'http://localhost:5174/' + formValues.image
      : URL.createObjectURL(formValues.image);
  };

  // Hooks
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (!isNew) {
      setFormValues(photoToEdit);
      // const _selectedCategories = [...photoToEdit.categories].map(
      //   (categ) => categ.id,
      // );
      // setSelectedCategories(_selectedCategories);
    } else {
      setFormValues(initialData);
      setSelectedCategories([]);
    }
  }, [photoToEdit, isNew]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[60] overflow-auto bg-black/60"
      onClick={onClosing}
    >
      <div
        className="absolute left-48 top-40 z-50 flex w-2/3 flex-col items-center rounded-md border-2 border-green-700 bg-green-600 p-3 shadow-2xl shadow-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bottone di chiusura  */}
        <div onClick={onClosing} className="self-end text-2xl">
          <i className="fa-regular fa-circle-xmark text-4xl text-green-800 duration-75 hover:cursor-pointer hover:text-white"></i>
        </div>

        <form
          className="mb-8 w-3/4"
          id="postCreate"
          onSubmit={handleFormSubmit}
        >
          {error && (
            <div className="mt-2 rounded bg-red-400 p-2 text-lg font-bold text-red-800 shadow-md">
              Errore nella creazione del post
            </div>
          )}

          {/* Titolo  */}
          <div className="mb-4 flex flex-col">
            <label htmlFor="title" className="mb-0.5 font-semibold">
              Titolo
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formValues.title}
              onChange={(e) => handleDataForm(e, 'title')}
              className="rounded-md p-1 text-black shadow-md"
            />
          </div>

          {/* Immagine  */}
          <div className="mb-4 flex flex-col">
            <label htmlFor="image" className="mb-0.5 font-semibold">
              Immagine
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => handleDataForm(e, 'image')}
              className="rounded-md p-1 text-black shadow-md"
            />
            {formValues.image && (
              <img
                src={handleImgPreview()}
                alt={formValues.title}
                className="mt-2 w-52"
              />
            )}
          </div>

          {/* Descrizione  */}
          <div className="mb-4 flex flex-col">
            <label htmlFor="description" className="mb-0.5 font-semibold">
              Descrizione
            </label>
            <textarea
              name="description"
              cols="30"
              rows="5"
              value={formValues.description}
              onChange={(e) => handleDataForm(e, 'description')}
              className="rounded-md p-1 text-black shadow-md"
            ></textarea>
          </div>

          {/* Categories  */}
          <h4 className="mb-1 font-semibold">Aggiungi Categorie</h4>
          <div className="mb-2 flex flex-wrap gap-1">
            {categories.map((category) => {
              return (
                <div key={category.id}>
                  <label
                    htmlFor={`category-${category.id}`}
                    className={`mr-0.5 inline-block rounded-full align-[3px] text-xs font-semibold duration-75 hover:scale-95 hover:cursor-pointer ${
                      formValues.categories.includes(category.id)
                        ? 'border-3 border-green-400 bg-green-800'
                        : 'border-3 border-green-800 bg-green-200'
                    }`}
                  >
                    <span
                      // onClick={() => selectCategories(category.id)}
                      className={`mr-0.5 inline-block px-2 py-0.5 align-[4px] text-sm font-semibold ${
                        formValues.categories.includes(category.id)
                          ? 'text-white'
                          : 'text-green-800'
                      }`}
                    >
                      {category.name}
                    </span>
                  </label>
                  <input
                    type="checkbox"
                    name={`category-${category.id}`}
                    id={`category-${category.id}`}
                    value={category.id}
                    checked={formValues.categories?.includes(category.id)}
                    onChange={(e) => handleDataForm(e, 'categories')}
                    className="peer hidden"
                  />
                </div>
              );
            })}
          </div>

          {/* Visibilità  */}
          <div className="mb-3 flex items-center">
            <span className="mr-2 font-semibold">Visibile </span>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={formValues.visible}
                onChange={(e) => handleDataForm(e, 'visible')}
                className="peer sr-only"
              />
              <div className="peer h-10 w-10  rounded-full bg-rose-400 shadow-md outline-none ring-0 duration-300  after:absolute after:left-1  after:top-1  after:flex after:h-8 after:w-8 after:-rotate-180 after:items-center after:justify-center after:rounded-full after:bg-gray-50 after:outline-none after:duration-500 after:content-['✖️'] peer-checked:bg-emerald-500  peer-checked:after:rotate-0 peer-checked:after:content-['✔️'] peer-hover:after:scale-75 peer-focus:outline-none"></div>
            </label>
          </div>

          <button
            type="submit"
            className="rounded-full bg-green-800 px-4 py-2 font-semibold shadow-md duration-150 hover:bg-green-900 hover:px-6"
          >
            {!isNew ? 'Modifica' : 'Crea'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCreateOverlay;
