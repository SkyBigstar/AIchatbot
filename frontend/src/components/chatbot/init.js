import React from "react";
import ReactDOM from "react-dom/client";
import Chatbot from "./Chatbot";

const init = () => {
  // Render the ChatbotWidget component into the specified DOM element
  const root = ReactDOM.createRoot(document.getElementById("root"));
  console.log("AAAA!!");
  root.render(<Chatbot />);
};

window.YourChatbotWidget = {
  init,
};
