// I didn't follow the security pattern suggested in the NextJS documentation but you should:
//
// https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation

export default async function handler(req, res) {
  const SECRET = process.env.REVALIDATE_SECRET

  if (req.query.secret !== 'PIPELINE') {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const urls = req.body

    const result = []

    for (const url of urls) {
      try {
        await res.unstable_revalidate(url)
        result.push({ url, success: true })
      } catch (err) {
        result.push({ url, success: false, error: err.message })
      }
    }

    return res.status(200).json({ revalidated: true, details: result })
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Error revalidating', error: err.message })
  }
}
