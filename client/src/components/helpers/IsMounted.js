import React, { useEffect, useRef } from 'react';

// Helper function to check if component is mounted before trying to set state
const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => isMounted.current = false;
  }, []);

  return isMounted;
}

export default useIsMounted;