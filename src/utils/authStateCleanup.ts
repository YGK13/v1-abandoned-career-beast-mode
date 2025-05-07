
/**
 * Clean up authentication state in local storage and session storage
 */
export const cleanupAuthState = () => {
  console.log("Performing aggressive auth state cleanup");
  
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-') || key.includes('auth-') || key.includes('token')) {
      console.log(`Removing localStorage key: ${key}`);
      localStorage.removeItem(key);
    }
  });
  
  // Remove cookies
  document.cookie.split(';').forEach(cookie => {
    const [name] = cookie.trim().split('=');
    if (name.includes('sb-') || name.includes('auth') || name.includes('supabase')) {
      console.log(`Removing cookie: ${name}`);
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  });
  
  // Remove from sessionStorage if in use
  try {
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-') || key.includes('auth-') || key.includes('token')) {
        console.log(`Removing sessionStorage key: ${key}`);
        sessionStorage.removeItem(key);
      }
    });
  } catch (e) {
    console.error("Error cleaning sessionStorage:", e);
  }
  
  // Clear all localStorage as last resort if still having issues
  // Uncomment this if still having issues
  // localStorage.clear();
};
