import fs from 'fs'
import { utcDay, utcMinute } from 'd3-time'
import { utcParse } from 'd3-time-format'

const randomize = (stock, i) =>
  Object.assign(stock, {
    waveFreq: 0.5 + 1.5 * Math.random(),
    waveShift: 0.5 + 1.5 * Math.random()
  })

const stocks = [
  { ticker: 'AAPL', startPrice: 119.25 },
  { ticker: 'GOOGL', startPrice: 829.53 },
  { ticker: 'FB', startPrice: 122.62 },
  { ticker: 'MSFT', startPrice: 62.61 }
]
stocks.forEach(randomize)

const parseTime = utcParse('%H:%M')
const DAY_START = 9.5
const DAY_END = 16
const CHANGE_ODDS = 0.7

const samplesPerDay = (DAY_END - DAY_START) * 60

class Market {
  constructor(startAt = 0) {
    const timestamp = (this.timestamp = utcMinute.offset(
      utcDay.floor(Date.now()),
      DAY_START * 60
    ).valueOf())
    this.history = stocks.map(({ ticker, startPrice }) => ({
      ticker,
      timestamp,
      price: startPrice
    }))

    if (startAt) {
      if (typeof startAt === 'string') {
        startAt = utcMinute.count(parseTime('9:30'), parseTime(startAt))
        startAt = Math.max(0, Math.min(startAt, DAY_END * 60))
      }
      while (startAt-- > 0) {
        this.generateMarketEvents()
      }
    }
  }

  startNewDay() {
    const timestamp = (this.timestamp = utcMinute.offset(
      utcDay.ceil(this.timestamp),
      DAY_START * 60
    ).valueOf())
    stocks.forEach(randomize)
    this.history = stocks.map(({ ticker }) => ({
      ticker,
      timestamp,
      price: this.getLastPrice(ticker)
    }))
    return { newDay: true, timestamp }
  }

  generateMarketEvents() {
    if (new Date(this.timestamp).getUTCHours() === DAY_END) {
      return this.startNewDay()
    }

    const timestamp = (this.timestamp = utcMinute.offset(this.timestamp, 1).valueOf())
    const changes = stocks.map(({ ticker, waveFreq, waveShift }) => {
      if (Math.random() > CHANGE_ODDS) return { ticker, change: 0 }
      else {
        const f =
          ((this.history.length / stocks.length) % samplesPerDay) / samplesPerDay
        const w = Math.sin((2 * Math.PI * (f + waveShift)) / waveFreq)
        const dir = Math.random() > 0.8 ? -1 : 1
        const lastPrice = this.getLastPrice(ticker)
        const amount =
          (parseInt(
            Math.max(
              -lastPrice * 0.8,
              dir *
                (2 * (Math.random() - 0.5) + w * Math.random()) *
                (lastPrice * 0.001) /
                waveFreq /
                (CHANGE_ODDS / 0.8)
            ) * 10000
          ) / 10000)
        return { ticker, change: amount }
      }
    })

    this.history.push(
      ...changes.map(({ ticker, change }) => ({
        ticker,
        timestamp,
        price: this.getLastPrice(ticker) + change
      }))
    )

    return { timestamp, changes: changes.filter(({ change }) => change !== 0) }
  }

  getLastPrice(ticker) {
    for (let i = this.history.length - 1; i >= 0; i--) {
      if (this.history[i].ticker === ticker) return this.history[i].price
    }
  }

  toJSON() {
    return {
      timestamp: this.history[0]?.timestamp || this.timestamp,
      stocks: stocks.map(({ ticker, waveFreq, waveShift }) => ({
        ticker,
        waveFreq,
        waveShift
      })),
      history: this.history
    }
  }

  writeToFile(filename = './market.json') {
  // writeToFile(filename = '../src/data/market.json') {
    fs.writeFileSync(filename, JSON.stringify(this.toJSON(), null, 2))
    console.log(`✅ JSON saved to ${filename}`)
  }
}

// Example usage
const market = new Market(60*6.5) // simulate full day of data
market.writeToFile()

// module.exports = Market
