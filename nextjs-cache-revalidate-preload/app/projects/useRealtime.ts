// OPTIONAL: polling to simulate multi-user updates
"use client";

import { useEffect } from "react";

export function useRealtimeProjects(sync: (data: any[]) => void) {
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("http://localhost:4000/projects");
      const data = await res.json();
      sync(data);
    }, 2000); // simulate other users

    return () => clearInterval(interval);
  }, [sync]);
}
