
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { SubscriptionProvider } from './context/SubscriptionContext'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SubscriptionProvider>
      <App />
    </SubscriptionProvider>
  </BrowserRouter>
);
