import { useState, useEffect } from 'react'
const API_URL = 'https://west.albion-online-data.com'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v2/stats/prices/T4_LEATHER,T4_LEATHER_LEVEL1@1,T4_LEATHER_LEVEL2@2,T4_LEATHER_LEVEL3@3,T4_LEATHER_LEVEL4@4?qualities=1`);
        if (!response.ok) {
          throw new Error(`error status: ${response.status}`);
        } 
        const json = await response.json();
        const lessData = json.map((item) => ({
          item: item.item_id,
          city: item.city,
          price: item.sell_price_min,
        }))
        setData(lessData)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, []);

  
  // useEffect(() => {
  //   console.log(data); // This will log the updated data after it has been set
  // }, [data]);


  return (
    <div>
      <h1>Albion Online Price Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default App
