import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // search + pagination state
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  // fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/courses");
        setCourses(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []);

  // filter courses
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  // pagination logic
  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);

  // enroll + payment
  const handleEnroll = async (courseId) => {
    try {
      setLoading(true);

      const { data } = await API.post("/payment/create-order", {
        courseId,
      });

      const options = {
        key: "rzp_test_SnpUyX1oPwhGNP",
        amount: data.order.amount,
        currency: "INR",
        name: "LMS",
        description: data.course.title,
        order_id: data.order.id,

        handler: async function (response) {
          await API.post("/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            courseId,
          });

          toast.success("Payment successful & enrolled!");
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-3xl font-bold text-gray-800">Explore Courses</h1>

        <Link
          to="/dashboard"
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black"
        >
          Dashboard
        </Link>

        <Link
          to="/my-courses"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          My Courses
        </Link>


       
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search courses..."
        className="w-full mb-6 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {/* Courses Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCourses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition duration-300 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {course.title}
              </h2>

              <p className="text-gray-600 text-sm mb-3">{course.description}</p>
            </div>

            <div>
              <p className="text-xl font-bold text-green-600 mb-3">
                ₹{course.price}
              </p>

              <button
                onClick={() => handleEnroll(course._id)}
                disabled={loading}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition disabled:bg-gray-400"
              >
                {loading ? "Processing..." : "Enroll Now"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        {[...Array(Math.ceil(filteredCourses.length / coursesPerPage))].map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded border ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Courses;
