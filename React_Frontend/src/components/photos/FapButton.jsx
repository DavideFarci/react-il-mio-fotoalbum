/* eslint-disable react/prop-types */
const FapButton = ({ openOverlay }) => {
  return (
    <button
      title="Nuovo Post"
      onClick={openOverlay}
      className="group fixed bottom-6 left-6 cursor-pointer outline-none duration-300 hover:rotate-90"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50px"
        height="50px"
        viewBox="0 0 24 24"
        className="fill-none stroke-orange-400 duration-300 group-hover:fill-orange-800 group-active:fill-orange-600 group-active:stroke-orange-200 group-active:duration-0"
      >
        <path
          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
          strokeWidth="1.5"
        ></path>
        <path d="M8 12H16" strokeWidth="1.5"></path>
        <path d="M12 16V8" strokeWidth="1.5"></path>
      </svg>
    </button>
  );
};

export default FapButton;
