import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/auth/user", {
          credentials: "include",
        });
        
        if (response.status === 401) {
          // Not authenticated, return null without throwing
          return null;
        }
        
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
      } catch (error) {
        // For any non-401 errors, return null silently for landing page
        console.debug("Auth check failed:", error);
        return null;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error: null, // Don't expose auth errors to UI
  };
}