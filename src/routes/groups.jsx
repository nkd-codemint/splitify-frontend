import { useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";

export async function loader() {
  try {
    const response = await fetch("http://localhost:3000/api/groups", {
      headers: {
        "x-auth-token": localStorage.getItem('token'), // Specify the request body content type
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      console.log(responseData);
    }
    const groups = await response.json();
    console.log("inside loader....");
    console.log(groups);
    return { groups };
  } catch (error) {
    console.log(error);
  }
}

export default function Groups() {
  const { groups } = useLoaderData();
  return (
    <>
      <Navbar isLoggedIn={true} />
      <div className="max-w-2xl mx-auto p-4 space-y-4 bg-gray-800 my-20">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          Groups
        </h2>

        {groups.map((group, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-gray-50"
          >
            {/* Group Profile Image */}
            <div className="flex items-center space-x-4">
              <img
                src={group.imageUrl}
                alt={group.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {group.name}
                </h3>
                <p className="text-sm text-gray-600">{group.description}</p>
              </div>
            </div>

            {/* Group Members */}
            <div className="text-sm text-gray-500">
              {group.members.length}{" "}
              {group.members.length === 1 ? "member" : "members"}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
