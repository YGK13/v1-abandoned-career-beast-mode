
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { SubscriptionProvider } from './context/SubscriptionContext'
import { AuthProvider } from './context/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client with improved error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000),
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    }
  },
})

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SubscriptionProvider>
          <App />
        </SubscriptionProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
