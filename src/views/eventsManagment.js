// This file handles the rendering and logic for the events management view
export async function eventsManagment() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return '';
  }

  // Get events from localStorage or use default
  let events = [];
  try {
    const storedEvents = localStorage.getItem('events');
    events = storedEvents ? JSON.parse(storedEvents) : [];
  } catch (error) {
    console.error('Error loading events:', error);
    events = [];
  }

  // Get user's joined events
  let userJoinedEvents = new Set();
  try {
    const storedJoined = localStorage.getItem('userJoinedEvents');
    userJoinedEvents = storedJoined ? new Set(JSON.parse(storedJoined)) : new Set();
  } catch (error) {
    console.error('Error loading joined events:', error);
    userJoinedEvents = new Set();
  }

  // <div class="h-full flex flex-col overflow-hidden">
  // <div class="flex-shrink-0 p-6 bg-white border-b">
    //<div class="max-w-6xl mx-auto">
      //<h2 class="text-2xl font-bold mb-2">Welcome, ${user.name}</h2>
      //<p class="mb-4 text-gray-700">Role: <span class="font-semibold">${user.role === 'admin' ? 'Administrator' : 'User'}</span></p>
      //${user.role === 'admin' ? `
       // <div class="mb-4 p-3 bg-green-100 text-green-800 rounded-lg border">
          //<i class="fas fa-crown mr-2"></i>You have administrator permissions. You can create, edit, and delete events.
        //</div>
     // ` : `
        //<div class="mb-4 p-3 bg-blue-100 text-blue-800 rounded-lg border">
          //<i class="fas fa-user mr-2"></i>You have standard user permissions. You can view and join events.
        //</div>
   //   `}
   // </div>
 // </div>

    return `
    <div class="flex-1 overflow-auto">
      <div class="max-w-6xl mx-auto p-6">
          ${user.role === 'admin' ? `
            <!-- Admin: Create Event Form -->
            <div class="mb-6 p-4 bg-gray-50 rounded-lg border">
              <h3 class="text-lg font-semibold mb-3">Create New Event</h3>
              <form id="create-event-form" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input type="text" id="event-name" placeholder="Event Name" required class="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="date" id="event-date" required class="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" id="event-location" placeholder="Location" required class="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="number" id="event-capacity" placeholder="Capacity" required class="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 
                transition cursor-pointer">
                  <i class="fas fa-plus mr-2"></i>Create an Event
                </button>
              </form>
            </div>
          ` : ''}

          <!-- Events List -->
          <div class="mb-6">
            <h3 class="text-xl font-semibold mb-4">Available Events</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              ${events.map(event => `
                <div class="bg-white rounded-lg shadow-md border hover:shadow-lg transition" data-event-id="${event.id}">
                  <div class="p-4">
                    <h4 class="text-lg font-semibold text-gray-800 mb-2">${event.name}</h4>
                    <div class="space-y-2 text-sm text-gray-600">
                      <p><i class="fas fa-calendar mr-2"></i>${event.date}</p>
                      <p><i class="fas fa-map-marker-alt mr-2"></i>${event.location}</p>
                      <p><i class="fas fa-users mr-2"></i>${event.attendees}/${event.capacity} attendees</p>
                      <p><i class="fas fa-circle mr-2 text-green-500"></i>${event.status}</p>
                    </div>
                    
                    <div class="mt-4 flex flex-wrap gap-2">
                      <button id="join-event-${event.id}" class="bg-green-600 text-white px-3 py-1 
                      rounded text-sm hover:bg-green-700 transition cursor-pointer ${userJoinedEvents.has(event.id) ? 'hidden' : ''}">
                        <i class="fas fa-sign-in-alt mr-1"></i>Join Event
                      </button>
                      <button id="leave-event-${event.id}" class="bg-red-600 text-white px-3 py-1 
                      rounded text-sm hover:bg-red-700 transition cursor-pointer ${userJoinedEvents.has(event.id) ? '' : 'hidden'}">
                        <i class="fas fa-sign-out-alt mr-1"></i>Leave Event
                      </button>
                      ${user.role === 'admin' ? `
                        <button id="edit-event-${event.id}" class="bg-blue-600 text-white px-3 py-1
                         rounded text-sm hover:bg-blue-700 transition cursor-pointer">
                          <i class="fas fa-edit mr-1 "></i>Edit
                        </button>
                        <button id="delete-event-${event.id}" class="bg-red-600 text-white px-3 py-1 
                        rounded text-sm hover:bg-red-700 transition cursor-pointer">
                          <i class="fas fa-trash mr-1 "></i>Delete
                        </button>
                      ` : ''}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Event Details Modal (Hidden by default) -->
      <div id="event-modal" class="fixed inset-0 bg-gray-200 bg-opacity-75 hidden z-50">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto shadow-xl border">
            <div class="flex justify-between items-center mb-4">
              <h3 id="modal-title" class="text-lg font-semibold">Event Details</h3>
              <button id="close-modal" class="text-gray-500 hover:text-gray-700">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div id="modal-content" class="space-y-3">
              <!-- Modal content will be populated dynamically -->
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
