// 403 view Forbidden
export async function forbiddenView() {
  return `
    <section class="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <div class="max-w-md w-full space-y-6">
        <div class="text-red-600">
          <svg class="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
          </svg>
        </div>
        <h1 class="text-4xl font-extrabold text-gray-800">403 - Denegate access</h1>
        <p class="text-gray-600 text-lg">I'm sorry, you don't have permission to this view.</p>
        <a href="/" class="inline-block mt-4 px-6 py-2 font-extrabold text-black rounded transition">
            Come Back to Home
        </a>
      </div>
    </section>
  `;
}
