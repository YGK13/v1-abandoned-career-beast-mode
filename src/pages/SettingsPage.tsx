import React from 'react';

const SettingsPage: React.FC = () => {
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
      <h1>Settings</h1>
      <p>Manage your application preferences and account details.</p>

      <div style={sectionStyle}>
        <h2>Account Settings</h2>
        <p>Manage your email, password, and other account-specific details.</p>
        <button style={buttonStyle} onClick={() => alert('Navigate to Account Settings (Placeholder)')}>
          Go to Account Settings
        </button>
      </div>

      <div style={sectionStyle}>
        <h2>Notification Preferences</h2>
        <p>Configure how and when you receive notifications from CareerBeast.</p>
        <button style={buttonStyle} onClick={() => alert('Configure Notifications (Placeholder)')}>
          Set Preferences
        </button>
      </div>

      <div style={sectionStyle}>
        <h2>Theme Customization</h2>
        <p>Choose your preferred theme (e.g., light, dark) and customize the application's appearance.</p>
        <button style={buttonStyle} onClick={() => alert('Customize Theme (Placeholder)')}>
          Change Theme
        </button>
      </div>

      <div style={sectionStyle}>
        <h2>Data & Privacy</h2>
        <p>Manage your personal data, download your information, or view our privacy policy.</p>
        <button style={buttonStyle} onClick={() => alert('Manage Data & Privacy (Placeholder)')}>
          Privacy Settings
        </button>
      </div>

      <div style={sectionStyle}>
        <h2>Integrations</h2>
        <p>Connect CareerBeast with other apps and services you use.</p>
        <button style={buttonStyle} onClick={() => alert('Manage Integrations (Placeholder)')}>
          View Integrations
        </button>
      </div>

    </div>
  );
};

export default SettingsPage;
