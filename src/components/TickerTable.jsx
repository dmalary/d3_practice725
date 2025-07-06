import { useMemo } from 'react';


export default function TickerTable({ticker, data}) {
  console.log('data', data)
  const tableData = useMemo(() => {
      if (!data || !data.history) return [];
  
      const startPrice = data.history[0].price;
      const endPrice = data.history[data.history.length - 1].price;

      const round = (num) => num.toFixed(2)
  
      // const percentChanges = data.history.map(d => ((d.price - startPrice) / startPrice) * 100);
    
      return ({
        currentPrice: round(endPrice),
        percentChange: round(((endPrice - startPrice) / startPrice) * 100),
        priceChange: round(endPrice - startPrice),
      })
  }, [data])

  const isPos = (num) => num > 0 ? '#2CA02C' : '#D62728';

  return (
    <>
    <table style={{borderLeft:`8px solid ${data.stockColor}`, margin:'5px 0'}}>
      <tbody>
        <tr>
          <td style={{color: data.stockColor}}>
            <a style={{color: data.stockColor}}>{ticker}</a>
          </td>
          <td style={{color: isPos(tableData.percentChange)}}>{tableData.percentChange}%</td>
        </tr>  
        <tr>
          <td style={{color: data.stockColor}}>${tableData.currentPrice}</td>
          <td style={{color: isPos(tableData.priceChange)}}>${tableData.priceChange}</td>
        </tr>  
      </tbody>
    </table>
    </>
  )
}