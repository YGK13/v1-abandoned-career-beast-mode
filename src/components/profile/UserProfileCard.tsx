import React from 'react';

interface UserProfileCardProps {
  name: string;
  headline: string;
  summary: string;
  contactEmail: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  name,
  headline,
  summary,
  contactEmail,
}) => {
  const cardStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '20px',
    margin: '20px 0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '15px',
  };

  const headingStyle: React.CSSProperties = {
    margin: '0 0 5px 0',
    fontSize: '1.2em',
  };

  const editButtonStyle: React.CSSProperties = {
    marginLeft: '10px',
    fontSize: '0.8em',
    padding: '3px 8px',
    cursor: 'pointer',
  };

  return (
    <div style={cardStyle}>
      <div style={sectionStyle}>
        <h2 style={headingStyle}>
          {name}
          <button style={editButtonStyle} onClick={() => alert('Edit Name (Placeholder)')}>Edit</button>
        </h2>
        <p>{headline}
          <button style={editButtonStyle} onClick={() => alert('Edit Headline (Placeholder)')}>Edit</button>
        </p>
      </div>

      <div style={sectionStyle}>
        <h3 style={headingStyle}>Summary
          <button style={editButtonStyle} onClick={() => alert('Edit Summary (Placeholder)')}>Edit</button>
        </h3>
        <p>{summary}</p>
      </div>

      <div style={sectionStyle}>
        <h3 style={headingStyle}>Contact Information</h3>
        <p>Email: {contactEmail}</p>
        {/* Add other contact fields if needed, each with an edit button */}
      </div>

      {/* Add more sections like Experience, Education, Skills with similar structure */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>Experience
            <button style={editButtonStyle} onClick={() => alert('Edit Experience (Placeholder)')}>Add/Edit</button>
        </h3>
        <p><em>(Placeholder for experience list)</em></p>
      </div>

      <div style={sectionStyle}>
        <h3 style={headingStyle}>Skills
            <button style={editButtonStyle} onClick={() => alert('Edit Skills (Placeholder)')}>Add/Edit</button>
        </h3>
        <p><em>(Placeholder for skills list)</em></p>
      </div>

    </div>
  );
};

export default UserProfileCard;
