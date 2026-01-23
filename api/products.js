module.exports = async (req, res) => {
  try {
    return res.json({
      hasDatabaseUrl: !!process.env.DATABASE_URL
    })
  } catch (err) {
    return res.status(500).json({ error: 'fail' })
  }
}
