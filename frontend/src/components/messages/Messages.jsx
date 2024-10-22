import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessage";
import MessageSkeleton from "../skeletons/MessageSkeletons";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex flex-col overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message, idx) => (
          <div
            key={message._id || idx} // Ensure every message has a unique key
            ref={idx === messages.length - 1 ? lastMessageRef : null} // Apply ref only to the last message
          >
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(10)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
