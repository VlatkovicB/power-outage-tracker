import cron from "node-cron"
import parser from "cron-parser"

export default (callback) => {
  const timing = "0 7 * * *"
  const interval = parser.parseExpression(timing)

  cron.schedule(timing, () => {
    console.log(`Next run will be at: ${interval.next()}`)
    callback()
  })
}
