import { useEffect, useState } from "react";
import API from "../api/axios";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/enrollments/my");
      setData(res.data);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">Courses Enrolled</h2>
          <p className="text-2xl font-bold">{data.length}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">Completed</h2>
          <p className="text-2xl font-bold">
            {data.filter(d => d.status === "completed").length}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">In Progress</h2>
          <p className="text-2xl font-bold">
            {data.filter(d => d.status === "active").length}
          </p>
        </div>

      </div>

      {/* Course List */}
      <div className="grid md:grid-cols-2 gap-4">
        {data.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded shadow">

            <h2 className="font-semibold text-lg">
              {item.course.title}
            </h2>

            <p className="text-gray-600 mb-2">
              {item.course.description}
            </p>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 h-3 rounded">
              <div
                className="bg-green-500 h-3 rounded"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>

            <p className="mt-2 text-sm">
              Progress: {item.progress}%
            </p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;