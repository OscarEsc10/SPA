let previousPath = window.location.pathname;

export async function applyTransition(html, newPath) {
  const app = document.getElementById('app');

  // Create a new temporal container to apply the animation with no stuck 
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  tempDiv.classList.add('w-full', 'h-full');

  // Detect the direction of the navigation
  const direction = determineSlideDirection(previousPath, newPath);
  tempDiv.classList.add(direction === 'left' ? 'slide-enter-left' : 'slide-enter-right');

  // Replace the current content with the aplly animation
  app.innerHTML = '';
  app.appendChild(tempDiv);

  previousPath = newPath;
}


// Verify the view position and move according to it
function determineSlideDirection(oldPath, newPath) {
  const routeOrder = ['/', '/login', '/register', '/dashboard', '/users'];
  const oldIndex = routeOrder.indexOf(oldPath);
  const newIndex = routeOrder.indexOf(newPath);

  if (oldIndex === -1 || newIndex === -1) return 'right';
  return newIndex > oldIndex ? 'right' : 'left';
}
