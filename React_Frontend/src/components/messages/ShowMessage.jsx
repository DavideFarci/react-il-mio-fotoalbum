/* eslint-disable react/prop-types */
// import { useEffect, useState } from 'react';

const ShowMessage = ({ show, onClosing, message }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-auto bg-black/40"
      onClick={onClosing}
    >
      <div
        className="flex min-h-[8rem] w-96 flex-col items-center rounded-md border-2 border-red-900 bg-red-800 p-1 shadow-2xl shadow-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bottone di chiusura  */}
        <div onClick={onClosing} className="self-end text-2xl">
          <i className="fa-regular fa-circle-xmark text-2xl text-red-900 duration-150  hover:cursor-pointer hover:text-white"></i>
        </div>
        <div className="text-lg">{message}</div>
      </div>
    </div>
  );
};

export default ShowMessage;
