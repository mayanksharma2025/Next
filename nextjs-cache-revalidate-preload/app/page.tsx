// // app/page.tsx
// export const revalidate = 60; // ⏱ route-level revalidation

// import { getCachedPosts } from "@/lib/db";
// import { updateUser, addPost, resetPage } from "./actions";

// export default async function Page() {
//   // 🔹 fetch with revalidate
//   const user = await fetch("http://localhost:4000/users/u1", {
//     next: { revalidate: 10, tags: ["user"] }, // ⏱ 10 sec
//   }).then((res) => res.json());

//   // 🔹 unstable_cache (20 sec)
//   const posts = await getCachedPosts();

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-xl font-bold">Revalidation Demo</h1>

//       {/* USER */}
//       <div className="p-4 border rounded">
//         <h2>User (10s revalidate)</h2>
//         <p>{user.name}</p>

//         <form action={updateUser}>
//           <button>Update User</button>
//         </form>
//       </div>

//       {/* POSTS */}
//       <div className="p-4 border rounded">
//         <h2>Posts (20s revalidate via unstable_cache)</h2>
//         {posts.map((p: any) => (
//           <div key={p.id}>{p.title}</div>
//         ))}

//         <form action={addPost}>
//           <button>Add Post</button>
//         </form>
//       </div>

//       {/* FULL RESET */}
//       <form action={resetPage}>
//         <button>Reset Page (revalidatePath)</button>
//       </form>
//     </div>
//   );
// }
