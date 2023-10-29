import './App.css';
import {data} from './data'
import {selected, priority} from './selected';
import {useState} from 'react';



function App() {
  const [showPriority, setShowPriority] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const c = data
  .sort((a, b) => a.priceNew - b.priceNew)
  .filter(car => car.priceNew <= 270000)
  .filter(car => {
    if(showPriority) {
      return priority.includes(car.id)
    } else {
      return selected.includes(car.id)
    }
    
  })
  .filter(car => {
    const f = [
      // 'interface-type.virtual-cockpit',
      // 'trimline.sline',
      // 'roof-type.panorama',
      // 'package-type.optics-black',
      // 'package-type.s-line-sport',
    ]

    return f.every(element => car.data.vehicle.search.features.includes(element))
    // roof-type.panorama
    // return car.data.vehicle.search.features.includes('roof-type.panorama')
  })

  console.log(c)
  
  return (
    <>
    <div>знайдено {c.length} машин</div>
    <div>
      <input type="checkbox" checked={showPriority} name="priority" id="priority" onChange={e => setShowPriority(e.target.checked)} />
      <label htmlFor="priority">Show Priority</label>
    </div>
    <div>
      <input type="checkbox" checked={showDetails} name="priority" id="details" onChange={e => setShowDetails(e.target.checked)} />
      <label htmlFor="details">Show Details</label>
    </div>
    <div className="App wrapper">
      {c.map(car => {
        return <a key={car.id} className='car' href={car.url} target="_blank" rel="noopener noreferrer">
          <img width={500} src={car.data.vehicle.basic.tilesPictures[0].url} alt="" />
          <br />
          <img width={240} src={car.data.vehicle.basic.tilesPictures[car.data.vehicle.basic.tilesPictures.length-1].url} alt="" />
          <img width={240} src={car.data.vehicle.basic.tilesPictures[car.data.vehicle.basic.tilesPictures.length-2].url} alt="" />
          <br />
          <b>{car.engine}</b><br />
          <span>{car.data.vehicle.basic.dealer.name}</span>
          <br />
          <div>
          <span className='price-new'>{car.priceNew}zl</span>
          <span className='price-old'>{car.priceOld}zl</span>
          <span className='rabat'>RABAT: {parseInt(100 - (car.priceNew * 100 / car.priceOld))}%</span>
          </div>
          {car.data.vehicle.basic.reservation && <div>
            Reserved?: {car.data.vehicle.basic.reservation ? 'Yes' : 'No'}
          </div>}
        
          <div>Color: {car.data.vehicle.basic.extColor.description}</div>
          
          <div>Panorama: {car.data.vehicle.search.features.includes('roof-type.panorama') ? 'YES' : 'No :('}</div>
          <div>S-Line Exterior: {car.data.vehicle.search.features.includes('trimline.sline') ? 'YES' : 'No :('}</div>
          <div>S-Line Interior: {car.data.vehicle.search.features.includes('package-type.s-line-sport') ? 'YES' : 'No :('}</div>
          <div>{car.data.vehicle.search.features.find(el => el.includes('wheel-size.'))}</div>
          <div>{car.data.vehicle.basic.upholsteryType.description}</div>
          <div>Features: {car.data.vehicle.search.features.length}</div>

          <div className='car-id'>ID: {car.id}, Oferta: {car.data.vehicle.basic.commissionNumber}</div>
          {/* <ul>
            {car.data.vehicle.search.features.map(f=> (
              <li>{f}</li>
            ))}
          </ul> */}
          {showDetails && <ul className='features'>
            {car.data.vehicle.detail.features.sort((a, b) => {
              if (!a.images) {return 1} else {return -1}
            }).map(feat => {
              const txt = feat.texts.find(t => t.key === "ak_headline")
              const img = feat.images?.[0]?.url;
            
              return (<li>
                {img && <img src={img} />}
                {txt.text}
                </li>)
            })}
            </ul>}
        </a>
      })}
    </div>
    </>
  );
}

export default App;
