/* eslint-disable no-promise-executor-return */
// Importing the required styles for the toast messages
import './toast.css';

// Toast Constructor function
function Toast(content, type, container) {
  this.content = content;
  this.type = type;
  // Creating the toast element
  const toast = document.createElement('div');
  const toastContent = document.createElement('span');
  const toastClose = document.createElement('button');
  toastClose.textContent = 'x';
  toast.appendChild(toastContent);
  toast.appendChild(toastClose);
  toast.classList.add('toast');
  toast.classList.add(type);
  toastContent.textContent = content;
  this.node = toast;

  // Show the toast message
  this.show = () => {
    container.appendChild(toast);
    toast.classList.add('visible');
  };

  // Remove the toast message
  this.remove = () => {
    toast.classList.remove('visible');
  };

  // Event listener to close the toast message when close button is clicked
  toastClose.addEventListener('click', this.remove);
}

// Helper function to sleep for a given duration
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to display the toast message
const deployToast = (content, type) => {
  // Get the toast container, and if its not present, create it
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.classList.add('toast-container');
    document.body.appendChild(toastContainer);
  }

  // Create a new Toast instance and show it
  const toast = new Toast(content, type, toastContainer);
  toast.show();

  // Set a timer to remove the toast after 3 seconds
  sleep(3000).then(() => {
    // Fade out the toast
    toast.remove();
    // Wait for the fade-out animation to finish before removing the toast element from the DOM
    sleep(250).then(() => {
      toast.node.remove();
    });
    // Check if the toast container is empty, and if so, remove it from the DOM
    sleep(3000).then(() => {
      if (toastContainer.childElementCount === 0) {
        toastContainer.remove();
      }
    });
  });
};

// eslint-disable-next-line import/prefer-default-export
export default deployToast; // Exporting the function to make it available in other modules
