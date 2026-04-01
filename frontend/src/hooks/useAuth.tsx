import { useUser, useClerk } from '@clerk/clerk-react';

export function useAuth() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  return {
    user: user ?? null,
    loading: !isLoaded,
    signOut: async () => {
      await signOut();
    },
  };
}
