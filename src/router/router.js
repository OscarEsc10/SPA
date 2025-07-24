// SPA Router for navigation between views without reloading the page
// Imports all the view functions
import { loginView } from "../views/login.js";
import { registerView } from "../views/register.js";
import { notFoundView } from "../views/notFound.js";
import { users } from "../views/users.js";
import { eventsManagment } from "../views/eventsManagment.js";
import { setupLoginForm, updateNavVisibility } from '../controllers/loginController.js';
import { setupLogoutButton } from '../controllers/logoutController.js';
import { registerLogic } from '../controllers/registerControllers.js';
import { forbiddenView } from "../views/forbidden.js";

// Import transition effects for smooth page transitions
import { applyTransition } from "../assets/jsStyles/styles.js";

// Route definitions: each path is associated with a view function
const routes = {
  // Home route: shows a welcome message
  "/": async () =>
    `<section class="flex flex-col items-center text-center gap-4"><h2 
  class="text-3xl font-bold">Welcome to my SPA</h2><p class="text-gray-600 max-w-2xl">
  This Single Page Application (SPA) is built with Vanilla JavaScript and Tailwind CSS. You can navigate between sections 
  such as login, dashboard, and public view without reloading the page.
 🚀</p><p class="text-blue-600">Use the navegation bar at the top to explore the aplication.</p></section>`,
  // Login view
  "/login": loginView,
  // Register view
  "/register": registerView,
  // Dashboard (event management) view
  "/dashboard": eventsManagment,
  // Users list view
  "/users": async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.rol !== 'admin') {
      return forbiddenView();
    }
    return users();
  },
};

// Main router function: loads the view based on the current path
// Parameter 'e' is the event object (optional, used for popstate events)
async function router(e) {
  // Get the current path from the browser's URL
  const path = window.location.pathname;
  // If the route does not exist, show the 404 view
  const view = routes[path] || notFoundView;
  // Render the view's HTML
  const html = await view();
  // Apply smooth transition effect when updating the content
  await applyTransition(html, path);

  if (path == '/login') setupLoginForm();
  if (path == '/dashboard') setupLogoutButton();
  if (path == '/register') registerLogic();
  setupLogoutButton();
  updateNavVisibility();
}

// SPA navigation: intercepts link clicks and browser navigation
// Handle browser back/forward buttons
window.addEventListener("popstate", router);
// Initialize router when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Intercept all link clicks on the page
  document.body.addEventListener("click", (e) => {
    // Only handle anchor tags that link to internal routes
    if (
      e.target.tagName === "A" &&
      e.target.href.startsWith(window.location.origin)
    ) {
      // Prevent default link behavior (page reload)
      e.preventDefault();
      // Update the browser's URL without reloading
      window.history.pushState({}, "", e.target.getAttribute("href"));
      // Load the new view with transition effect
      router();
    }
  });
  // Initial load of the application
  router();
});
