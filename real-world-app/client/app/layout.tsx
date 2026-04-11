export const metadata = {
  title: "Task Manager",
  description: "SEO optimized Next.js app",
};

export default function RootLayout({ children }: any) {
  return (
    <html>
      <body>
        <header>
          <img src="/logo.png" />
        </header>
        {children}
        <footer>
          <img src="/footer.png" />
        </footer>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </body>
    </html>
  );
}
