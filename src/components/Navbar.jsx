import { Form } from "react-router-dom";

export default function Navbar({ isLoggedIn }) {
  return (
    <nav className="bg-indigo-800 text-white p-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Brand Name */}
        <div className="text-xl font-semibold">
          <a href="/" className="hover:text-indigo-200">
            Splitify
          </a>
          <a href="/groups/create" className="hover:text-indigo-200 ml-2 font-normal text-lg">
            Create group
          </a>
        </div>

        {/* Authentication Button */}
        <div>
          <Form method="POST" action="/logout">
            <button className="px-4 py-2 bg-indigo-800 rounded-lg hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </Form>
        </div>
      </div>
    </nav>
  );
}
