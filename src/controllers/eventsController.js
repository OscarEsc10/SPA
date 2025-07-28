// Events Controller - Handles all event-related functionality
// Sample events data (in a real app, this would come from an API)
let events = getEventsFromStorage();
let userJoinedEvents = getUserJoinedEventsFromStorage();

// Initialize events if none exist
if (events.length === 0) {
  events = [
    { id: 1, name: 'Tech Conference 2024', date: '2024-03-15', location: 'Convention Center', capacity: 500, attendees: 320, status: 'active' },
    { id: 2, name: 'Music Festival', date: '2024-04-20', location: 'Central Park', capacity: 1000, attendees: 850, status: 'active' },
    { id: 3, name: 'Business Workshop', date: '2024-05-10', location: 'Business Center', capacity: 100, attendees: 75, status: 'active' },
    { id: 4, name: 'Art Exhibition', date: '2024-06-05', location: 'Museum of Modern Art', capacity: 200, attendees: 180, status: 'active' },
    { id: 5, name: 'Sports Tournament', date: '2024-07-12', location: 'Sports Complex', capacity: 300, attendees: 250, status: 'active' }
  ];
  saveEventsToStorage(events);
}

// Helper functions for localStorage
function getEventsFromStorage() {
  try {
    const stored = localStorage.getItem('events');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading events from storage:', error);
    return [];
  }
}

function saveEventsToStorage(eventsData) {
  try {
    localStorage.setItem('events', JSON.stringify(eventsData));
  } catch (error) {
    console.error('Error saving events to storage:', error);
  }
}

function getUserJoinedEventsFromStorage() {
  try {
    const stored = localStorage.getItem('userJoinedEvents');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch (error) {
    console.error('Error loading joined events from storage:', error);
    return new Set();
  }
}

function saveUserJoinedEventsToStorage(joinedEvents) {
  try {
    localStorage.setItem('userJoinedEvents', JSON.stringify([...joinedEvents]));
  } catch (error) {
    console.error('Error saving joined events to storage:', error);
  }
}

// Setup all event handlers after the view is rendered
export function setupEventsHandlers() {
  // Clear any existing event listeners to prevent duplicates
  clearExistingEventListeners();
  
  setupCreateEventForm();
  setupJoinLeaveButtons();
  setupAdminButtons();
  setupModalHandlers();
}

// Clear existing event listeners to prevent duplicates
function clearExistingEventListeners() {
  // Remove existing event listeners by cloning and replacing elements
  const createForm = document.getElementById('create-event-form');
  if (createForm) {
    const newForm = createForm.cloneNode(true);
    createForm.parentNode.replaceChild(newForm, createForm);
  }
  
  // Clear modal event listeners
  const modal = document.getElementById('event-modal');
  if (modal) {
    const newModal = modal.cloneNode(true);
    modal.parentNode.replaceChild(newModal, modal);
  }
}

// Handle create event form (admin only)
function setupCreateEventForm() {
  const form = document.getElementById('create-event-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newEvent = {
      id: events.length + 1,
      name: document.getElementById('event-name').value,
      date: document.getElementById('event-date').value,
      location: document.getElementById('event-location').value,
      capacity: parseInt(document.getElementById('event-capacity').value),
      attendees: 0,
      status: 'active'
    };

    // Add event to the list
    events.push(newEvent);
    saveEventsToStorage(events);
    
    // Reset form
    form.reset();
    
    // Show success message
    showNotification('Event created successfully!', 'success');
    
    // Refresh the page to show the new event
    window.history.replaceState({}, '', '/dashboard');
    window.dispatchEvent(new Event('popstate'));
  });
}

// Handle join/leave event buttons
function setupJoinLeaveButtons() {
  events.forEach(event => {
    const joinBtn = document.getElementById(`join-event-${event.id}`);
    const leaveBtn = document.getElementById(`leave-event-${event.id}`);
    
    if (joinBtn) {
      joinBtn.addEventListener('click', () => joinEvent(event.id));
    }
    
    if (leaveBtn) {
      leaveBtn.addEventListener('click', () => leaveEvent(event.id));
    }
  });
}

// Handle admin buttons (edit/delete)
function setupAdminButtons() {
  events.forEach(event => {
    const editBtn = document.getElementById(`edit-event-${event.id}`);
    const deleteBtn = document.getElementById(`delete-event-${event.id}`);
    
    if (editBtn) {
      editBtn.addEventListener('click', () => editEvent(event.id));
    }
    
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => deleteEvent(event.id));
    }
  });
}

// Handle modal functionality
function setupModalHandlers() {
  const modal = document.getElementById('event-modal');
  const closeBtn = document.getElementById('close-modal');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
}

// Join an event
function joinEvent(eventId) {
  const event = events.find(e => e.id === eventId);
  if (!event) return;
  
  if (event.attendees >= event.capacity) {
    showNotification('Event is full!', 'error');
    return;
  }
  
  if (userJoinedEvents.has(eventId)) {
    showNotification('You are already joined to this event!', 'warning');
    return;
  }
  
  // Update event attendees
  event.attendees++;
  userJoinedEvents.add(eventId);
  
  // Save to localStorage
  saveEventsToStorage(events);
  saveUserJoinedEventsToStorage(userJoinedEvents);
  
  // Update UI
  updateEventUI(eventId);
  showNotification(`Successfully joined ${event.name}!`, 'success');
}

// Leave an event
function leaveEvent(eventId) {
  const event = events.find(e => e.id === eventId);
  if (!event) return;
  
  if (!userJoinedEvents.has(eventId)) {
    showNotification('You are not joined to this event!', 'warning');
    return;
  }
  
  // Update event attendees
  event.attendees = Math.max(0, event.attendees - 1);
  userJoinedEvents.delete(eventId);
  
  // Save to localStorage
  saveEventsToStorage(events);
  saveUserJoinedEventsToStorage(userJoinedEvents);
  
  // Update UI
  updateEventUI(eventId);
  showNotification(`Successfully left ${event.name}!`, 'success');
}

// Edit an event (admin only)
function editEvent(eventId) {
  const event = events.find(e => e.id === eventId);
  if (!event) return;
  
  // Show edit modal
  showEditModal(event);
}

// Delete an event (admin only)
function deleteEvent(eventId) {
  const event = events.find(e => e.id === eventId);
  if (!event) return;
  
  if (confirm(`Are you sure you want to delete "${event.name}"?`)) {
    // Remove event from list
    events = events.filter(e => e.id !== eventId);
    
    // Remove from user's joined events if applicable
    userJoinedEvents.delete(eventId);
    
    // Save to localStorage
    saveEventsToStorage(events);
    saveUserJoinedEventsToStorage(userJoinedEvents);
    
    showNotification(`Event "${event.name}" deleted successfully!`, 'success');
    
    // Refresh the page
    window.history.replaceState({}, '', '/dashboard');
    window.dispatchEvent(new Event('popstate'));
  }
}

// Update event UI after changes
function updateEventUI(eventId) {
  const event = events.find(e => e.id === eventId);
  if (!event) return;
  
  // Find the event card
  const eventCard = document.querySelector(`[data-event-id="${eventId}"]`);
  if (!eventCard) return;
  
  // Update attendees count
  const attendeesText = eventCard.querySelector('.space-y-2 p:nth-child(3)');
  if (attendeesText) {
    attendeesText.innerHTML = `<i class="fas fa-users mr-2"></i>${event.attendees}/${event.capacity} attendees`;
  }
  
  // Update join/leave button visibility
  const joinBtn = document.getElementById(`join-event-${eventId}`);
  const leaveBtn = document.getElementById(`leave-event-${eventId}`);
  
  if (userJoinedEvents.has(eventId)) {
    if (joinBtn) joinBtn.classList.add('hidden');
    if (leaveBtn) leaveBtn.classList.remove('hidden');
  } else {
    if (joinBtn) joinBtn.classList.remove('hidden');
    if (leaveBtn) leaveBtn.classList.add('hidden');
  }
}

// Show edit modal
function showEditModal(event) {
  const modal = document.getElementById('event-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  
  if (!modal || !modalTitle || !modalContent) return;
  
  modalTitle.textContent = `Edit Event: ${event.name}`;
  modalContent.innerHTML = `
    <form id="edit-event-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
        <input type="text" id="edit-event-name" value="${event.name}" required class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input type="date" id="edit-event-date" value="${event.date}" required class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input type="text" id="edit-event-location" value="${event.location}" required class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
        <input type="number" id="edit-event-capacity" value="${event.capacity}" required class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div class="flex gap-2 pt-4">
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
          <i class="fas fa-save mr-2"></i>Save Changes
        </button>
        <button type="button" id="cancel-edit" class="bg-gray-500 text-white px-4 py-2 rounded
         hover:bg-gray-600 transition cursor-pointer">
          Cancel
        </button>
      </div>
    </form>
  `;
  
  // Show modal
  modal.classList.remove('hidden');
  
  // Setup form handler
  const editForm = document.getElementById('edit-event-form');
  const cancelBtn = document.getElementById('cancel-edit');
  
  if (editForm) {
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveEventChanges(event.id);
    });
  }
  
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeModal);
  }
}

// Save event changes
function saveEventChanges(eventId) {
  const event = events.find(e => e.id === eventId);
  if (!event) return;
  
  // Update event data
  event.name = document.getElementById('edit-event-name').value;
  event.date = document.getElementById('edit-event-date').value;
  event.location = document.getElementById('edit-event-location').value;
  event.capacity = parseInt(document.getElementById('edit-event-capacity').value);
  
  // Ensure attendees don't exceed new capacity
  if (event.attendees > event.capacity) {
    event.attendees = event.capacity;
  }
  
  // Save to localStorage
  saveEventsToStorage(events);
  
  closeModal();
  showNotification(`Event "${event.name}" updated successfully!`, 'success');
  
  // Refresh the page
  window.history.replaceState({}, '', '/dashboard');
  window.dispatchEvent(new Event('popstate'));
}

// Close modal
function closeModal() {
  const modal = document.getElementById('event-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Show notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full`;
  
  // Set colors based on type
  switch (type) {
    case 'success':
      notification.className += ' bg-green-500 text-white';
      break;
    case 'error':
      notification.className += ' bg-red-500 text-white';
      break;
    case 'warning':
      notification.className += ' bg-yellow-500 text-white';
      break;
    default:
      notification.className += ' bg-blue-500 text-white';
  }
  
  notification.innerHTML = `
    <div class="flex items-center">
      <span>${message}</span>
      <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 100);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 300);
    }
  }, 3000);
}
