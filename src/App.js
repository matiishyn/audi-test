import './App.css';
import {data} from './data'
import {selected} from './selected';



function App() {

  const c = data
  .sort((a, b) => a.priceNew - b.priceNew)
  .filter(car => car.priceNew <= 270000)
  .filter(car => selected.includes(car.id))
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
          <div>Кальоса: {car.data.vehicle.search.features.find(el => el.includes('wheel-size.'))}</div>
          <div>Крісла: {car.data.vehicle.basic.upholsteryType.description}</div>
          <div>Features: {car.data.vehicle.search.features.length}</div>

          <div className='car-id'>ID: {car.id}, Oferta: {car.data.vehicle.basic.commissionNumber}</div>
          {/* <ul>
            {car.data.vehicle.search.features.map(f=> (
              <li>{f}</li>
            ))}
          </ul> */}
        </a>
      })}
    </div>
    </>
  );
}

export default App;
