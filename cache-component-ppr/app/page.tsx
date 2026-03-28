import { cookies } from "next/headers";
import { Suspense } from "react";
import ThemeButton from "./components/ThemeButton";

async function UserTheme() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "light";

  return <p>Theme: {theme}</p>;
}

export default function Page() {
  return (
    <>
      <ThemeButton />

      <Suspense fallback={<p>Loading theme...</p>}>
        <UserTheme />
      </Suspense>
    </>
  );
}

{
  /* 
  🧠 Behavior
    Initial HTML → fallback
    Data → streamed later
    No caching at all
  
  */
}
