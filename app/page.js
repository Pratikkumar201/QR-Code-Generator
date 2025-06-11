// ✅ pages/index.js (or app/page.js in app router)
'use client'

import { useState } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [qrUrl, setQrUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('text', text)

    const res = await fetch('https://qr-code-generator-ij17.onrender.com', {
      method: 'POST',
      body: formData,
    })

    const blob = await res.blob()
    const imageUrl = URL.createObjectURL(blob)
    setQrUrl(imageUrl)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white font-sans">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 mb-4">
        Welcome to
      </h1>
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6">QR Code Generator</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center gap-4">
        <label htmlFor="text" className="text-gray-700 w-full text-2xl">Enter Text or URL</label>
        <input
          id="text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter here"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Generate QR Code
        </button>
      </form>

      {qrUrl && (
        <div className="mt-6 text-center">
          <img src={qrUrl} alt="Generated QR Code" className="mx-auto border p-2 rounded shadow" />
          <a
            href={qrUrl}
            download="qr-code.png"
            className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
          >
            Download QR Code
          </a>
        </div>
      )}
    </main>
  )
}
