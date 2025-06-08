import React from 'react';

const BusinessBuildingPage: React.FC = () => {
  const sectionStyle: React.CSSProperties = {
    border: '1px solid #eee',
    padding: '20px',
    margin: '20px 0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  };

  return (
    <div>
      <h1>Build Your Business</h1>
      <p>Tools, resources, and guidance to help you start and grow your own venture.</p>

      <div style={sectionStyle}>
        <h2>Form Your LLC</h2>
        <p>Navigate the process of forming your Limited Liability Company. Understand the benefits, legal requirements, and steps involved.</p>
        <button style={buttonStyle} onClick={() => alert('LLC Formation - Learn More (Placeholder)')}>
          Learn More
        </button>
      </div>

      <div style={sectionStyle}>
        <h2>Growth Strategies</h2>
        <p>Discover proven strategies to grow and scale your business. From marketing to operations, find what works for you.</p>
        <button style={buttonStyle} onClick={() => alert('Growth Strategies - Learn More (Placeholder)')}>
          Explore Strategies
        </button>
      </div>

      <div style={sectionStyle}>
        <h2>Business Resources</h2>
        <p>Access curated resources, templates, and tools for entrepreneurs. Find funding opportunities, mentorship programs, and more.</p>
        <button style={buttonStyle} onClick={() => alert('Business Resources - Learn More (Placeholder)')}>
          Access Resources
        </button>
      </div>

      <div style={sectionStyle}>
        <h2>Networking & Community</h2>
        <p>Connect with other entrepreneurs, share experiences, and find collaborators in our community forums and events.</p>
        <button style={buttonStyle} onClick={() => alert('Community - Learn More (Placeholder)')}>
          Join Community
        </button>
      </div>

    </div>
  );
};

export default BusinessBuildingPage;
