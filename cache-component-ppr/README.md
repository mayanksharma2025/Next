1. Optimistic UI Pattern (with updateTag)
   Core idea

You update the UI before the server confirms, then reconcile afterward.

This is where updateTag becomes powerful—it lets you align server cache with your optimistic client state almost immediately.

Mental Model
User clicks "Add Post"
↓
UI updates instantly (optimistic)
↓
Server action runs
↓
updateTag syncs server cache
↓
No flicker / no stale state
