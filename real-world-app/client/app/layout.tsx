import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { logout } from "./(auth)/logout/action";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const token = (await cookies()).get("token")?.value;

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-100">
        {/* Navbar */}
        <header className="bg-white border-b text-gray-600">
          <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
            <Link href="/tasks" className="font-semibold">
              TaskApp
            </Link>

            <nav className="flex gap-4 items-center">
              <Link href="/tasks">Tasks</Link>
              <Link href="/projects">Projects</Link>

              {!token ? (
                <>
                  <Link href="/login">Login</Link>
                  <Link href="/register">Register</Link>
                </>
              ) : (
                <form action={logout}>
                  <button className="text-red-600">Logout</button>
                </form>
              )}
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 max-w-5xl mx-auto w-full p-4 text-gray-600">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t">
          <div className="max-w-5xl mx-auto p-4 text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} TaskApp
          </div>
        </footer>
      </body>
    </html>
  );
}
