import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  // fetch enrolled courses
  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await API.get("/enrollments/my");
        setCourses(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load courses");
      }
    };

    fetchMyCourses();
  }, []);

  // update progress
  const updateProgress = async (id, progress) => {
    try {
      await API.put(`/enrollments/${id}/progress`, {
        progress,
      });

      // ✅ toast instead of alert
      toast.success("Progress updated");

      // ✅ update UI without reload
      setCourses((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, progress } : item
        )
      );

    } catch (error) {
      console.log(error);
      toast.error("Failed to update progress");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl mb-4">My Courses</h1>

      <div className="grid grid-cols-2 gap-4">
        {courses.map((item) => (
          <div key={item._id} className="border p-4 rounded">
            <h2 className="font-bold">{item.course.title}</h2>

            <p className="mb-2">{item.course.description}</p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-3 rounded">
              <div
                className="bg-green-500 h-3 rounded"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>

            <p className="mt-2">Progress: {item.progress}%</p>

            {/* Buttons to simulate learning */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => updateProgress(item._id, 25)}
                className="bg-blue-500 text-white px-2 py-1"
              >
                25%
              </button>

              <button
                onClick={() => updateProgress(item._id, 50)}
                className="bg-blue-500 text-white px-2 py-1"
              >
                50%
              </button>

              <button
                onClick={() => updateProgress(item._id, 100)}
                className="bg-green-600 text-white px-2 py-1"
              >
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;