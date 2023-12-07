// Define the loadChatbot function that accepts the user's API key or token
function loadChatbot() {
  // Check if the chatbot is already loaded on the page
  if (window.__YOUR_CHATBOT_LOADED__) {
    console.warn("Chatbot is already loaded on the page");
    return;
  }

  // Helper function to inject the bundled JavaScript file
  function injectScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  // Helper function to inject the bundled CSS file (if applicable)
  // function injectStylesheet(href) {
  //   const link = document.createElement('link');
  //   link.href = href;
  //   link.rel = 'stylesheet';
  //   document.head.appendChild(link);
  // }

  // Inject the chatbot widget files
  window.onload = () => {
    injectScript("http://127.0.0.1:8080/bundle.js")
      .then(() => {
        console.log("Chatbot widget loaded successfully");
        window.__YOUR_CHATBOT_LOADED__ = true;
        window.YourChatbotWidget.init();
      })
      .catch(() => {
        console.error("Error loading chatbot widget");
      });
  };

  // If you have a separate CSS file, inject it with the following line:
  // injectStylesheet('https://your-cdn-url.com/path/to/your/your-chatbot-widget.css');
}

// Expose the loadChatbot function globally
window.YourChatbotLoader = {
  loadChatbot,
};
