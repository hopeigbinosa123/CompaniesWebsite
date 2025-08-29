import React from "react";

function RegisterForm() {
  return (
    <div className="w-80 mx-auto mt-24 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-semibold mb-6">Register</h2>
      <form action="/login" method="post" className="flex flex-col gap-2">
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="email"
          name="password"
          placeholder="Email"
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          className="w-full p-2 mt-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;