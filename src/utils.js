export const formatScraping = (result) => {
  const entries = Object.entries(result).reduce((acc, curr) => {
    const [k, v] = curr
    const li = v.map((i) => `<li><b>${i[3]}</b>\t\t${i[2]}</li>`)
    const html = `${k}\n ${li.join("\n")}`
    acc.push(html)
    return acc
  }, [])

  return [entries.length > 0, entries.reverse().join("")]
}
