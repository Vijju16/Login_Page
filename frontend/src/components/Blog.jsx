import React from 'react';
import './Blog.css';

const Blog = () => {
  const posts = [
    { title: "5 Tips for a Healthier Lifestyle", date: "March 25, 2025", summary: "Adopt these simple habits for long-term wellness." },
    { title: "Understanding Your Lab Reports", date: "April 2, 2025", summary: "Decoding your health reports made simple." },
    { title: "Benefits of Telemedicine", date: "April 8, 2025", summary: "Virtual doctor consultations are changing the healthcare landscape." },
    { title: "Managing Stress Through Mindfulness", date: "April 15, 2025", summary: "Explore how mindfulness can reduce stress and improve overall well-being." },
    { title: "Why Annual Health Checkups Matter", date: "April 18, 2025", summary: "Preventive care saves lives—learn why annual checkups are essential." },
    { title: "How to Stay Hydrated in Summer", date: "April 22, 2025", summary: "Hydration tips to beat the heat and stay healthy." },
    { title: "Understanding Health Insurance Plans", date: "April 25, 2025", summary: "Decode the terms of common health insurance policies." },
    { title: "Sleep Hygiene for a Better Life", date: "April 28, 2025", summary: "Simple strategies to improve your sleep patterns naturally." },
    { title: "Nutrition Essentials: A Balanced Plate", date: "May 1, 2025", summary: "What goes on your plate matters—here’s how to keep it balanced." },
  ];

  return (
    <div className="blog-container">
      <h1 className="blog-title">Health Blog</h1>
      {posts.map((post, i) => (
        <div key={i} className="blog-post">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-date">{post.date}</p>
          <p className="post-summary">{post.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default Blog;
