/* eslint-disable react/prop-types */

const Photo = ({ photo, onSelectedPhoto }) => {
  const { title, image, description, visible, categories } = photo;
  // console.log(categories);
  return (
    <div className="max-w-2xl border p-2">
      <h4>{title}</h4>
      <img src={`http://localhost:5174/${image}`} alt="" />
      <p>{description}</p>
      <div>
        Visibile{' '}
        {visible ? (
          <i className="fa-regular fa-circle-check text-green-500"></i>
        ) : (
          <i className="fa-regular fa-circle-xmark text-red-500"></i>
        )}
      </div>
      <div>
        <i
          onClick={() => onSelectedPhoto(photo)}
          title="Modifica"
          className="fa-solid fa-pen-to-square mr-3 text-orange-300 duration-150 hover:scale-125 hover:cursor-pointer"
        ></i>
        <i
          title="Elimina"
          className="fa-solid fa-trash-can mr-3 text-red-500 duration-150 hover:scale-125 hover:cursor-pointer"
        ></i>
        <i
          title="Espandi"
          className="fa-regular fa-eye text-green-500 duration-150 hover:scale-125 hover:cursor-pointer"
        ></i>
      </div>
    </div>
  );
};

export default Photo;
