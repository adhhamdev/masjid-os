
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <section className="text-center p-8">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Our Software Product</h1>
        <p className="mt-4 text-lg text-gray-600">Transform your workflow with our innovative solutions.</p>
        <div className="mt-6">
          <a href="/protected/dashboard" className="px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700">
            Get Started
          </a>
        </div>
      </section>
    </main>
  )
}
