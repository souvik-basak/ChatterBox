import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import useSendMessage from "../../hooks/useSendMessage";
const MessagesInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <div>
      <form action="" className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="w-full relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input input-boarded rounded-full w-full border text-sm block p-2.5 bg-gray-700 border-gray-600 text-white"
            placeholder="Send a message..."
          />
          <button className="absolute inset-y-0 end-0 flex items-center pe-3">
            {loading ? (
              <div className="loader loading-spinner"></div>
            ) : (
              <IoMdSend className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessagesInput;
