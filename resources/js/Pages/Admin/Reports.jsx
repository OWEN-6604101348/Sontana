import React, { useState } from "react";
import SideNavBar from "@/Components/SideNavBar";
import { Link, usePage } from "@inertiajs/react";

const Reports = () => {
  const { reports } = usePage().props; // ดึงข้อมูลจาก Inertia props
  const [selectedReports, setSelectedReports] = useState([]);

  const handleCardClick = (id) => {
    setSelectedReports((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((reportId) => reportId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div className="md:flex bg-gray-100 min-h-screen">
      <SideNavBar />
      <div className="flex-1 p-6 md:ml-64">
        <h1 className="text-2xl font-bold">Report System</h1>
        {reports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {reports.map((report) => (
              <div
                key={report.id}
                className={`bg-white shadow-md rounded-lg p-4 relative cursor-pointer ${
                  selectedReports.includes(report.id)
                    ? "bg-gray-200"
                    : ""
                }`}
                onClick={() => handleCardClick(report.id)}
              >
                <h3 className="text-lg font-semibold">
                  {report.post?.title || "Untitled"}
                </h3>
                <p className="text-gray-600">
                  Author: {report.post?.user?.name || "Unknown"}
                </p>
                <p className="text-red-500">Reason: {report.reason}</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <Link
                    href={`/sontana/posts/${report.post?.id}`}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-gray-600">No reports available</p>
        )}
      </div>
    </div>
  );
};

export default Reports;
