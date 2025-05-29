import { Search, CreditCard, MessageSquare, ClipboardList } from "lucide-react";

const services = [
  {
    title: "Find Scholarships & Universities",
    description: "Browse verified scholarships and universities tailored to your academic and financial needs.",
    icon: <Search className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: "Apply with Easy Payments",
    description: "Secure your opportunity by paying and applying directly through our platform in a few clicks.",
    icon: <CreditCard className="w-8 h-8 text-green-600" />,
  },
  {
    title: "Leave Reviews & Feedback",
    description: "Help others by reviewing scholarships and universities you've interacted with.",
    icon: <MessageSquare className="w-8 h-8 text-yellow-500" />,
  },
  {
    title: "Track Application Status",
    description: "Stay updated on every stage of your scholarship application with real-time status tracking.",
    icon: <ClipboardList className="w-8 h-8 text-blue-500" />,
  },
];

export default function Services() {
  return (
    <section className="py-16 mt-8 mb-8" id="services">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-gray-600 text-lg">
            Everything you need to search, apply, and succeed with scholarships.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}