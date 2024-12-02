import { Form, redirect, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";

export async function loader() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log(token);
    return redirect("/login");
  }

  try {
    // Make a POST request to the server using fetch
    const response = await fetch("http://localhost:3000/api/users");

    // Check if the response status is OK (status 200-299)
    if (!response.ok) {
      const responseData = await response.json();
      console.log(responseData);
    }
    const users = await response.json();
    return { users };
  } catch (error) {
    return error; // Handle any error that occurs
  }
}

export async function action({ request }) {
  const formData = await request.formData();
  console.log("Action called....");
  const groupName = formData.get("groupName");
  const members = formData.getAll("members");
  const groupData = {
    name: groupName,
    members: members,
  };
  try {
    const response = await fetch("http://localhost:3000/api/groups", {
      method: "POST", // Specifies the request method
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json", // Specify the request body content type
      },
      body: JSON.stringify(groupData), // Convert the JavaScript object to a JSON string
    });

    if (!response.ok) {
      const responseData = await response.json();
      console.log(responseData)
    }

    return redirect("/groups");
  } catch (error) {
    console.log(error)
  }
}

export default function CreateGroup() {
  const { users } = useLoaderData();
  return (
    <>
      <Navbar isLoggedIn={true} />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Create New Group
        </h2>
        <Form method="POST">
          {/* Group Name */}
          <div className="mb-4">
            <label
              htmlFor="groupName"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Group Name
            </label>
            <input
              type="text"
              id="groupName"
              name="groupName"
              required
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter group name"
            />
          </div>

          {/* Users Checkbox List */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Select Users
            </label>
            <div className="space-y-2">
              {users.map((user) => (
                <div key={user._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`user-${user._id}`}
                    name="members"
                    value={user._id}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`user-${user._id}`}
                    className="ml-2 text-sm text-gray-600"
                  >
                    {user.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create Group
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
