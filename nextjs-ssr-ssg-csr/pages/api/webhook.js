// I didn't follow the security pattern suggested in the NextJS documentation but you should:
//
// https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation

export default async function handler(req, res) {
  const SECRET_TOKEN = process.env.REVALIDATE_SECRET

  if (req.query.secret !== SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    for (const url of req.body) {
      await res.revalidate(url)
    }
    return res.status(200).json({ revalidated: true })
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating', error: err })
  }
}
