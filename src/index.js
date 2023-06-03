import { config } from "dotenv"
import express from "express"

config()

import scrape from "./scrape.js"
import email from "./email.js"
import { formatScraping } from "./utils.js"
import cron from "./cron.js"

cron(async () => {
  const result = await scrape()
  const [shouldSendEmail, context] = formatScraping(result)

  if (shouldSendEmail) {
    email(context)
  }
})

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", async (request, response) => {
  const result = await scrape()
  const [_, data] = formatScraping(result)

  return response.send({ data })
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
