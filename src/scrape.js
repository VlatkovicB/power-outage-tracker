import puppeteer from "puppeteer"

export default async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  })
  const page = await browser.newPage()

  const base = "http://www.elektrovojvodina.rs"
  const initial = "/sl/mediji/ED-Sremska-Mitrovica"
  await page.goto(base + initial)

  const [linkList, inner] = await page.evaluate(() => [
    Array.from(document.querySelectorAll("div.content_body_left ul a[href]"), (a) => a.getAttribute("href")),
    Array.from(document.querySelectorAll("div.content_body_left ul a[href]"), (a) => a.innerText),
  ])

  const result = {}
  for (let i = 0; i < linkList.length; i++) {
    result[inner[i]] = []
    const url = linkList[i]
    await page.goto(`${base}${url}`)
    const selector = "body > div.container > div.content > div.content_body_left > table > tbody > tr > td"
    const [_intro, ...list] = await page.$$eval(selector, (e) => e.map((el) => el.innerText))
    const groups = []
    let group = []

    for (let j = 0; j < list.length; j++) {
      group.push(list[j])
      if (j % 4 === 3) {
        groups.push(group)
        group = []
      }
    }

    const indexes = groups.reduce((acc, curr, i) => {
      if (curr.includes("Martinci")) {
        acc.push(i)
      }

      return acc
    }, [])

    indexes.forEach((index) => result[inner[i]].push(groups[index]))
  }

  await browser.close()

  Object.entries(result).map(([key, value]) => {
    if (!value.length) delete result[key]
  })

  return result
}
