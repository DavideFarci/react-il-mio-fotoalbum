/* eslint-disable react/prop-types */
import { useAuth } from '../../contexts/AuthContext';
const Photo = ({ photo, onSelectedPhoto, onDeletePhoto, showFullImg }) => {
  const { id, title, image, description, visible, categories } = photo;
  const { isLogged } = useAuth();
  // console.log(categories);
  return (
    <div className="mb-12 ml-12 max-w-2xl rounded-lg bg-red-700/30 p-2">
      <h4 className="mb-1 text-xl font-bold  ">{title}</h4>
      <img
        src={`http://localhost:5174/${image}`}
        alt=""
        className="rounded-lg"
      />
      <p className="font-semibold">{description}</p>
      <div>
        Visibile{' '}
        {visible ? (
          <i className="fa-regular fa-circle-check text-green-500"></i>
        ) : (
          <i className="fa-regular fa-circle-xmark text-red-500"></i>
        )}
      </div>
      <div>
        <span className="font-bold">Categorie: </span>
        {categories?.map((categ) => (
          <span key={categ.id} className="mr-2 text-sm font-semibold">
            {categ.name}
          </span>
        ))}
      </div>
      {isLogged && (
        <div className="text-right">
          <i
            onClick={() => onSelectedPhoto(photo)}
            title="Modifica"
            className="fa-solid fa-pen-to-square mr-3 text-orange-300 duration-150 hover:scale-125 hover:cursor-pointer"
          ></i>
          <i
            onClick={() => onDeletePhoto(id)}
            title="Elimina"
            className="fa-solid fa-trash-can mr-3 text-red-500 duration-150 hover:scale-125 hover:cursor-pointer"
          ></i>
          <i
            onClick={() => showFullImg(photo)}
            title="Espandi"
            className="fa-regular fa-eye text-green-500 duration-150 hover:scale-125 hover:cursor-pointer"
          ></i>
        </div>
      )}
    </div>
  );
};

export default Photo;
