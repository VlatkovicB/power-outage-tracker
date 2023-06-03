import { config } from "dotenv"

config()

import scrape from "./scrape.js"
import email from "./email.js"
import { formatScraping } from "./utils.js"
import cron from "./cron.js"

cron(() =>
  scrape().then((result) => {
    const [shouldSendEmail, context] = formatScraping(result)

    if (shouldSendEmail) {
      email(context)
    }
  })
)
