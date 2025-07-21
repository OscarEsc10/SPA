// Returns the HTML for the login view
export async function loginView() {
  return `
<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8" id="app">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img
      class="mx-auto h-16 w-16"
      src="./src/assets/login.png"
      alt="Login Icon"
    />
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
      Sign in to your account
    </h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form id="login-form" class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-900">Email address</label>
        <div class="mt-2">
          <input
            type="email"
            id="email"
            autocomplete="off"
            required
            class="block w-full rounded-md px-3 py-1.5 bg-white text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-900">Password</label>
        <div class="mt-2">
          <input
            type="password"
            id="password"
            autocomplete="off"
            required
            class="block w-full rounded-md px-3 py-1.5 bg-white text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white 
          hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 cursor-pointer"
        >
          Sign in
        </button>
      </div>
    </form>
    <p id="login-error" class="mt-4 text-center text-sm text-red-600 font-semibold"></p>
  </div>
</div>
  `
}