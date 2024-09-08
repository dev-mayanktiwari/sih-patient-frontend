import { Link } from "react-router-dom";

const services = [
  { id: 1, title: "View Hospitals", path: "/hospitals", icon: "🏥" },
  { id: 2, title: "Book Appointment", path: "/book-appointment", icon: "📅" },
  { id: 3, title: "Check Bed Status", path: "/bed-status", icon: "🛏️" },
  {
    id: 4,
    title: "Check Appointment Status",
    path: "/appointment-status",
    icon: "🕒",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            Our Services
          </h1>
          <p className="text-xl text-gray-600">
            Choose a service to get started
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              to={service.path}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <div className="p-6 flex flex-col items-center">
                <span
                  className="text-4xl mb-4"
                  role="img"
                  aria-label={service.title}
                >
                  {service.icon}
                </span>
                <h2 className="text-xl font-semibold text-gray-800 text-center">
                  {service.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
