import { Link } from "react-router-dom";
import bg from "../assets/bg.png"
import EventListing from "../components/EventListing";
import { useAuth } from "../context/AuthContext";

export default function LandingPage() {
  const { user } = useAuth();
  return (
     <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <main className="flex flex-col min-h-[60dvh] items-center justify-center flex-1 px-6 text-center" style={{backgroundImage: `url(${bg})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Discover & Book Exciting Events
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-6">
          From concerts to workshops, EventEase makes event booking simple and fun.  
          Join thousands of users exploring events every day.
        </p>
        <div className="space-x-4">
          <Link to="/events" className="bg-red-500 text-white px-6 py-3 rounded-md font-medium hover:bg-red-600">
            Browse Events
          </Link>
          {
            !user && (<Link to="/auth" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-300">
            Get Started
          </Link>)
          }
        </div>
      </main>

      

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">🎫 Easy Booking</h3>
            <p className="text-gray-600 mt-2">Book up to 2 seats with just a few clicks.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">🔒 Secure Login</h3>
            <p className="text-gray-600 mt-2">JWT-based authentication keeps your data safe.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">🛠️ Admin Control</h3>
            <p className="text-gray-600 mt-2">Admins can create, update, and manage events.</p>
          </div>
        </div>
        
      </section>

      <section>
        <EventListing  homepage={true} />
      </section>
      

      {/* Footer */}
      <footer className="py-6 bg-gray-100 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} EventEase. All rights reserved.
      </footer>
    </div>
  );
}
