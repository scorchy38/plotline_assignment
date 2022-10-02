import { IconButton, Input, SkeletonText } from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'

import { useRef, useState } from 'react'
import './App.css'
import Config from './Config'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const center = { lat: 12.9716, lng: 77.5946 }

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: Config.mapsApi,
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('Please enter both Origin and Destination!')
  const [duration, setDuration] = useState('')
  const [mode, setMode] = useState('DRIVING')

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }


  async function findRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      toast.error('Please enter both Origin and Destination!')
      clearFields('Please enter both Origin and Destination!')
      return
    }
  
    /** Error Handling and Logic **/

    try {
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: mode,
      })
      setDirectionsResponse(results)

      setDistance(results.routes[0].legs[0].distance.text)
      setDuration(results.routes[0].legs[0].duration.text)
      toast.success('Multiple routes available, showing fastest one!')

    } catch (error) {
      if (
        error.toString() ===
        'MapsRequestError: DIRECTIONS_ROUTE: ZERO_RESULTS: No route could be found between the origin and destination.'
      ) {
        clearFields('No Routes Found!')
        toast.error('No Routes Found!')
      } else {
        toast.error(error.toString())
      }
    }
  }


  function clearFields(error) {
    setDirectionsResponse(null)
    setDistance(error)
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  const handleModeChange = (mode) => {
    setMode(mode.target.value)
  }

  return (
    <>
      <ToastContainer />
      <div className="parent-div">
        
        <div className="map-box">
        {/* Map Box */}
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: true,
              fullscreenControl: true,
            }}
            onLoad={(map) => setMap(map)}
          >
         {/* Initial Marker */}
            <Marker
              position={center}
              draggable={true}
              // eslint-disable-next-line no-undef
              animation={google.maps.Animation.DROP}
            />

          {/* Route Polyline */}
            {directionsResponse && (
              <DirectionsRenderer
                directions={directionsResponse}
                routeIndex={0}
              />
            )}
          </GoogleMap>
        </div>

        {/* Inputs Handling Box */}
        <div className="input-box">
          <div className="ib-one">
            <div
              style={{
                display: 'flex',
              }}
            >
              <select
                className="select-mode-dwn"
                name="mode"
                onChange={(mode) => handleModeChange(mode)}
              >
                <option value="DRIVING">Driving</option>
                <option value="TRANSIT">Transit</option>
                <option value="WALKING">Walking</option>
                <option value="BICYCLING">Bicycling</option>
              </select>
            </div>
            <div className="ib-one-dv">
              <Autocomplete>
                <Input type="text" placeholder="Origin" ref={originRef} />
              </Autocomplete>
            </div>
            <div className="ib-one-dv">
              <Autocomplete>
                <Input
                  type="text"
                  placeholder="Destination"
                  ref={destiantionRef}
                />
              </Autocomplete>
            </div>

            <div className="ib-one">
              <button className="find-route-btn" onClick={findRoute}>
                Find Route
              </button>

              <IconButton
                aria-label="center back"
                style={{ color: 'white' }}
                icon={<FaTimes />}
                onClick={(event) => clearFields('No Routes Found!')}
              />
            </div>
          </div>

          <div className="info">
            <span className="route-details">
              <span className="bold-label"> Route Details:</span> &nbsp;{' '}
              <span className="result">{distance + ' (' + duration + ')'}</span>
            </span>
            <IconButton
              aria-label="center back"
              style={{ color: 'white' }}
              icon={<FaLocationArrow />}
              isRound
              onClick={() => {
                map.panTo(center)
                map.setZoom(12)
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
