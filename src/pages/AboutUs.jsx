const AboutUs = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-blue-600">About EduFunds</h1>
                    <p className="mt-2 text-lg text-gray-600">Bridging Students with Opportunities</p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 md:p-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Who We Are</h2>
                    <p className="text-gray-600 leading-relaxed">
                        EduFunds is a comprehensive Scholarship Management System designed to help students find the best scholarship opportunities. We connect students with universities and funding programs to support their educational journey. Our platform simplifies the application process, making higher education accessible and affordable.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed">
                            To empower students worldwide by providing seamless access to scholarships, ensuring that financial constraints never become a barrier to higher education.
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Vision</h2>
                        <p className="text-gray-600 leading-relaxed">
                            To become the leading global platform for scholarship search and application, fostering an inclusive and educated society where every student has the opportunity to succeed.
                        </p>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Meet Our Team</h2>
                    <p className="text-gray-600 mt-2">A dedicated team committed to shaping the future of students through accessible scholarships.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                            <img src="https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133876.jpg" alt="Founder" className="mx-auto w-32 h-32 object-cover rounded-full mb-3" />
                            <h3 className="text-lg font-semibold">John Doe</h3>
                            <p className="text-gray-600 text-sm">Founder & CEO</p>
                        </div>

                        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                            <img src="https://img.freepik.com/free-photo/3d-portrait-people_23-2150793895.jpg" alt="CTO" className="mx-auto w-32 h-32 object-cover rounded-full mb-3" />
                            <h3 className="text-lg font-semibold">Jane Smith</h3>
                            <p className="text-gray-600 text-sm">Chief Technology Officer</p>
                        </div>

                        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                            <img src="https://img.freepik.com/free-psd/3d-illustration-with-online-avatar_23-2151303097.jpg" alt="Operations Head" className="mx-auto w-32 h-32 object-cover rounded-full mb-3" />
                            <h3 className="text-lg font-semibold">Emily Brown</h3>
                            <p className="text-gray-600 text-sm">Head of Operations</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;