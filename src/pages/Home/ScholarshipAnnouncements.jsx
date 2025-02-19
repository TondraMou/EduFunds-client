import Marquee from "react-fast-marquee";

const ScholarshipAnnouncements = () => {
  const announcements = [
    "📢 New! Tech Innovators Scholarship - Apply by March 25, 2025!",
    "🎓 Women in STEM Grant - $10,000 Award! Deadline: April 5, 2025!",
    "🌍 International Student Fund - Applications Open!",
    "💰 Need-Based Financial Aid - Limited Spots Available!",
    "⏳ Last Chance! Business Leaders Scholarship Closes Soon!",
  ];

  return (
    <div className=" py-3 mt-24">
      <Marquee pauseOnHover speed={50}>
        {announcements.map((announcement, index) => (
          <span key={index} className="mx-8 font-semibold">
            {announcement}
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default ScholarshipAnnouncements;