
import * as React from "react"

const MOBILE_BREAKPOINT = 768
const LOCAL_STORAGE_KEY = "app_mobile_state"

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Try to get the mobile state from localStorage first for consistency across tabs
    try {
      const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedValue !== null) {
        return JSON.parse(storedValue);
      }
    } catch (error) {
      console.error("Error reading mobile state from localStorage:", error);
    }
    
    // Set the initial value based on window size if we're in a browser environment
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT
    }
    return false
  })

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleResize = () => {
      const newIsMobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(newIsMobile);
      
      // Save to localStorage to sync across tabs
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newIsMobile));
      } catch (error) {
        console.error("Error saving mobile state to localStorage:", error);
      }
    }
    
    // Sync state across tabs/windows
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === LOCAL_STORAGE_KEY && event.newValue !== null) {
        try {
          const newValue = JSON.parse(event.newValue);
          setIsMobile(newValue);
        } catch (error) {
          console.error("Error parsing mobile state from localStorage:", error);
        }
      }
    };
    
    // Add event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("storage", handleStorageChange);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("storage", handleStorageChange);
    }
  }, [])

  return isMobile
}
