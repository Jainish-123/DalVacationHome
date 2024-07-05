import { useState } from "react";
import { postMessage } from "../../api/queriesApi";

export const PostQuery = () => {
  const [message, setMessage] = useState("");

  return (
    <div className='flex flex-col gap-2 justify-center items-center h-screen w-full'>
      <div className='flex items-center justify-center'>
        <div className='w-full max-w-md p-4 bg-white rounded-lg z-10 shadow-md'>
          <h2>Enter a message</h2>
          <div className='flex flex-col'>
            <textarea
              className='border-2 border-black min-h-[120px]'
              placeholder='Enter a message'
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button
              className='btn btn-primary mt-3'
              onClick={() => {
                postMessage(message);
              }}
            >
              Post message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
