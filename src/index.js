import { config } from "dotenv"

import scrape from "./scrape.js"

config()

scrape().then((r) => console.log(r))
