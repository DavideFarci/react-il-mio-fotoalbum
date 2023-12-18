/* eslint-disable react/prop-types */
const Show = ({ show, onClosing, photo }) => {
  if (!show) return null;
  return (
    <div
      className="fixed inset-0 z-[60] overflow-auto bg-black/40"
      onClick={onClosing}
    >
      <img
        src={`http://localhost:5174/${photo.image}`}
        alt=""
        className="p-4"
      />
    </div>
  );
};

export default Show;
