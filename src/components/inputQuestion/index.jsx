import React, { forwardRef } from "react";

const InputQuestion = forwardRef(({ onClick, onKeyDown, isSubmitted }, ref) => {
  return (
    <div className="flex items-center w-[93%] sm:w-[800px] mx-auto fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Ketikan sesuatu...."
          className="w-full px-5 py-3 pr-12 text-white rounded-full bg-[#00000097] dark:bg-[#ffffff54]  outline-none border-none dark:placeholder:text-white"
          id="inputContent"
          onKeyDown={onKeyDown}
          ref={ref}
        />
        <button
          type="button"
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
            isSubmitted && "opacity-30"
          }`}
          onClick={onClick}
          disabled={isSubmitted}
        >
          <img
            src="./images/icons/send.png"
            alt="Send Icon"
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
});

export default InputQuestion;
