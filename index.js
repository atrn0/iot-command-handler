const { sendCommand } = require('./iot-core/iot-core')

const handleCommand = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'POST')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.set('Access-Control-Max-Age', '3600')
    res.status(204).send('')
  } else if (req.get('content-type') === 'application/json') {
    try {
      const body = req.body
      if (body.token !== process.env.CLOUD_FUNC_TOKEN) {
        res.status(401).json({ message: 'Your token is invalid' })
        return
      }
      await sendCommand(JSON.stringify(body.cmd))
      res.status(204).send('')
    } catch (e) {
      res.status(500).json({ message: 'failed to stringify JSON' })
    }
  } else {
    res.status(400).json({ message: 'Bad Request' })
  }
}

module.exports = { handleCommand }
