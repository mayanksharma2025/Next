import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-2 px-2 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <h1 className="font-lato font-normal">Lato Regular (default)</h1>
        <h2 className="font-lato font-medium">Lato Medium</h2>
        <h3 className="font-lato font-semibold">Lato SemiBold</h3>
        <h4 className="font-lato font-bold">Lato Bold</h4>
        <h5 className="font-lato italic font-normal">Lato Italic</h5>

        <h1 className="font-opensans font-normal">Open Sans Regular</h1>
        <h2 className="font-opensans font-medium">Open Sans Medium</h2>
        <h3 className="font-opensans font-bold">Open Sans Bold</h3>
        <h4 className="font-opensans italic font-normal">Open Sans Italic</h4>
      </main>
    </div>
  )
}
