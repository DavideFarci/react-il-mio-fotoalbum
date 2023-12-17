/* eslint-disable react/prop-types */

const Photo = ({ photo }) => {
  const { title, image, description, visible, categories } = photo;
  return (
    <div>
      <h4>{title}</h4>
      {/* <img src={`http://localhost:5174/${image}`} alt="" /> */}
    </div>
  );
};

export default Photo;
