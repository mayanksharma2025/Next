export default function Layout({
  children,
  // 👈 matches "@modal"
  sidebar, // 👈 matches "@sidebar"
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
  sidebar: React.ReactNode
}) {
  return (
    <div>
      {sidebar}
      <main>{children}</main>
      {modal}
    </div>
  )
}
