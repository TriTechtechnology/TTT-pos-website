import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainPage() {
  return (
    <>
      {/* Footer - Fixed at bottom behind content */}
      <div className="fixed bottom-0 left-0 right-0 z-0">
        <Footer />
      </div>

      {/* Main Content Card */}
      <div className="relative z-10 bg-gradient-to-b from-gray-100 to-gray-200 rounded-b-[40px] shadow-2xl min-h-screen mb-[400px]">
        {/* Content */}
        <main className="pb-16">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-3 lg:px-4 pt-32 pb-16">
              <div className="text-center">
                <h1 className="text-5xl lg:text-6xl font-bold text-[#080A16] mb-6 leading-tight">
                  Welcome to TTT POS
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Your comprehensive point of sale solution for modern businesses
                </p>
                <div className="flex gap-4 justify-center">
                  <button className="px-8 py-4 bg-gradient-to-r from-[#d1ab35] to-[#f4c430] text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300">
                    Get Started
                  </button>
                  <button className="px-8 py-4 border-2 border-[#d1ab35] text-[#d1ab35] font-semibold rounded-full hover:bg-[#FFF9E6] transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="max-w-7xl mx-auto px-3 lg:px-4 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-[#d1ab35] to-[#f4c430] rounded-xl mb-6 flex items-center justify-center text-white text-xl font-bold">
                      {i + 1}
                    </div>
                    <h2 className="text-2xl font-semibold mb-4 text-[#080A16]">
                      Feature {i + 1}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      Discover powerful features designed to streamline your business operations
                      and enhance customer experience. Scroll to see the header behavior.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Section for Scrolling */}
            <div className="max-w-7xl mx-auto px-3 lg:px-4 py-16 pb-32">
              <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
                <h2 className="text-3xl font-bold text-[#080A16] mb-6 text-center">
                  Why Choose TTT POS?
                </h2>
                <div className="space-y-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#d1ab35] to-[#f4c430] rounded-full flex-shrink-0 flex items-center justify-center text-white">
                        ✓
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-[#080A16]">
                          Benefit {i + 1}
                        </h3>
                        <p className="text-gray-600">
                          Experience seamless integration, powerful analytics, and exceptional support
                          that helps your business grow.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </main>
      </div>

      {/* Header - Fixed overlay on top of content */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
    </>
  );
}
