// This file handles the registration view and user registration logic
export async function registerView() {
    return `
    <body class="bg-gradient-to-br from-blue-50 to-white min-h-screen flex items-center justify-center px-4" id="app">
      <div class="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full border-t-4 border-blue-600">
        <h2 class="text-3xl font-bold text-blue-600 text-center mb-6">
          Create an account
        </h2>
        <form class="space-y-5" id='register-form'>
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input
              type="text"
              id="name"
              name="name"
              autocomplete='off'
              placeholder="Your full name"
              required
              class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
  
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              autocomplete='off'
              placeholder="example@email.com"
              required
              class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
  
          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              autocomplete='off'
              placeholder="••••••••"
              required
              class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
  
          <!-- Register Button -->
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition duration-300 
            shadow-md cursor-pointer"
          >
            Register
          </button>
        </form>
  
        <!-- Link to login -->
        <p class="text-center text-sm text-gray-600 mt-6">
          Already have an account?
          <a href="/login" class="text-blue-600 hover:underline font-medium">Log in</a>
        </p>
    `;
    
  }
  