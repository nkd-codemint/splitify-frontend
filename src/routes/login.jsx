import { Form, redirect, useActionData } from "react-router-dom";


export async function loader({ request }){
    const token = localStorage.getItem('token')

    if(token){
        return redirect('/dashboard')
    }
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const loginData = {
    email: email,
    password: password,
  };

  let error = null;
  try {
    // Make a POST request to the server using fetch
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST", // Specifies the request method
      headers: {
        "Content-Type": "application/json", // Specify the request body content type
      },
      body: JSON.stringify(loginData), // Convert the JavaScript object to a JSON string
    });
    
    // Check if the response status is OK (status 200-299)
    if (!response.ok) {
      const responseData = await response.json();
      error = responseData.msg;
      return error 
      
    }
    // Parse the JSON response
    const responseData = await response.json();
    console.log(responseData);
    console.log(localStorage);
    localStorage.setItem("token", responseData["token"]);
    return redirect("/dashboard"); // Handle the response data
  } catch (error) {
    return error // Handle any error that occurs
  }
}

export default function Login() {
  const error  = useActionData();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-lg">
        
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Login to Splitify
        </h2>

        <Form className="space-y-4" method="post">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </Form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-indigo-600 hover:text-indigo-700">
            Sign up
          </a>
        </p>
        {error && <p className="bg-red-300 p-2">{error}</p>}
      </div>
    </div>
  );
}
