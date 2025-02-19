const PartnerInstitutions = () => {
    const partners = [
      { name: "Harvard University", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/1200px-Harvard_University_coat_of_arms.svg.png" },
      { name: "Stanford University", logo: "https://identity.stanford.edu/wp-content/uploads/sites/3/2020/07/block-s-right.png" },
      { name: "MIT", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs2JoLLmjfdYZ2Twavh6nDP0ooCeayukb0Ww&s" },
      { name: "Oxford University", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford-University-Circlet.svg/1636px-Oxford-University-Circlet.svg.png" },
      { name: "Cambridge University", logo: "https://i.pinimg.com/736x/70/76/e4/7076e47f6e6c673bf103f235e2c654bd.jpg" },
      { name: "Yale University", logo: "https://rfleadership.org/wp-content/uploads/2022/08/230-2307146_transparent-yale-university-logo-hd-png-download-removebg-preview.png" },
    ];
  
    return (
      <section className="mt-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Our Partner Institutions
          </h2>
          <p className="text-gray-600 mb-10">
            We collaborate with top universities and organizations to provide the best scholarships for students worldwide.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-white shadow-md rounded-2xl transition-transform transform hover:scale-105 duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-20 w-20 object-contain"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-700">
                  {partner.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default PartnerInstitutions;  