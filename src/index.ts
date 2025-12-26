// Simulate a 4 scenarios of the server healthy, slow, error, infinite time taking resource
import express from 'express'
import { httpLogger, logger } from './logger.js';
const app = express()
app.use(express.json())
app.use(httpLogger)

enum MODE {
    HEALTHY = "healthy",
    SLOW = "slow",
    ERROR = "error",
    TIMEOUT = "timeout"
}

let currentMode: MODE = MODE.HEALTHY;
// Set the external api mode
app.post("/admin/mode/:mode", (req, res) => {
    const mode = req.params.mode as MODE
    if (!Object.values(MODE).includes(mode)) {
        // 400 basically denotes invalid or malformed request
        return res.status(400).json({ "success": false, "message": "Invalid mode" })
    }

    currentMode = mode
    logger.info(`External API switched to mode ${currentMode}`)

    return res.status(200).json({ "success": true, mode: currentMode })


})

// Simulate the external api

app.get("/external/data", async (req, res) => {
    switch (currentMode) {
        case MODE.HEALTHY:
            return res.status(200).json({ "success": true, "message": "OK" })

        case MODE.SLOW:
            await sleep(4000)
            return res.status(200).json({ "success": true, "message": "Slow response" })

        case MODE.ERROR:
            return res.status(500).json({ "success": false, "message": "Error on server side" })

        case MODE.TIMEOUT:
            return
    }
})


async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

app.listen(4000, () => {
    console.log(`Service running on PORT 4000`)
})