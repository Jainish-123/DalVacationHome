import { useEffect, useState } from "react";
import { postMessage } from "../../api/queriesApi";
import { toast } from "react-toastify";
import { useAuth } from "../../context/Auth";
import { getUser, User } from "../../api/authApis";

/**
 * Author: Ketul Patel
 * This component allows to enter query using simple input which can be further inserted into Google Pub/Sub
 * @returns
 */
export const PostQuery = () => {
  const [message, setMessage] = useState("");

  const { getSession } = useAuth();

  const [userData, setUserData] = useState<User | undefined>(undefined);

  const fetchUserDetails = async () => {
    try {
      const session = await getSession();
      const email = session.getIdToken().payload.email;

      const data = await getUser(email);
      setUserData(data.data);
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className='flex flex-col gap-2 justify-center items-center h-screen w-full'>
      <div className='flex items-center justify-center'>
        <div className='w-full max-w-md p-4 bg-white rounded-lg z-10 shadow-md'>
          <h2>Enter a message</h2>
          <div className='flex flex-col'>
            <textarea
              className='border-2 p-1 border-black min-h-[120px]'
              placeholder='Enter a message'
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button
              className='btn btn-primary mt-3'
              onClick={async () => {
                await postMessage(message, userData?.userId, userData?.email);
                toast("Successfully posted query", {
                  type: "success",
                });
                setMessage("");
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
