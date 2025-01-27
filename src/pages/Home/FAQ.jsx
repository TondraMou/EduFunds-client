

import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is EduFunds?",
      answer: "EduFunds is a scholarship management platform that helps students apply for scholarships across various universities and courses."
    },
    {
      question: "How can I apply for a scholarship?",
      answer: "You can apply for a scholarship by browsing through the available scholarships, selecting one, and following the application process on the scholarship details page."
    },
    {
      question: "What are the types of users on EduFunds?",
      answer: "There are three types of users: Regular User, Moderator, and Admin. Each type has different access and privileges on the platform."
    },
    {
        question: "How can I track the status of my scholarship application?",
        answer: "You can track the status of your scholarship application by visiting the 'Application Status' section on your dashboard. It will show whether your application is under review, approved, or rejected."
      },
    {
      question: "How do I contact support?",
      answer: "You can contact support by sending an email to support@edufunds.com, and our team will get back to you as soon as possible."
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left py-4 px-6 font-semibold text-gray-800 focus:outline-none"
            >
              {faq.question}
            </button>
            {activeIndex === index && (
              <div className="py-4 px-6 text-gray-700 bg-gray-50">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;