What you now have

1. Optimistic UI (with updateTag)

   Uses useOptimistic + Server Actions
   Instant UI update
   Server cache stays consistent
   No flicker after navigation

2. SWR Demo
   Pure client-side caching
   Uses mutate() for optimistic updates
   Revalidates after API call

How to test (important)

Run your app and observe carefully:

🔹 Optimistic UI section

- Add a post → appears instantly
- Refresh → still there (consistent server cache)

🔹 SWR section

- Add post → appears instantly
- But this is client cache
- Hard refresh → depends on server state

Key behavioral difference you should notice

| Scenario                | Optimistic + updateTag | SWR                |
| ----------------------- | ---------------------- | ------------------ |
| Instant UI              | ✅                     | ✅                 |
| Server cache updated    | ✅                     | ❌                 |
| Survives navigation     | ✅                     | ❌ (until refetch) |
| Works without client JS | ✅                     | ❌                 |

Critical insight (this is the real takeaway)

- Optimistic UI + updateTag = full-stack consistency
- SWR = frontend illusion + eventual sync
