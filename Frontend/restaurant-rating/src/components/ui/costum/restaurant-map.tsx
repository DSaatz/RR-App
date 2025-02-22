"use client"

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix the marker icon issue by pointing to the CDN URLs
delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  })

interface RestaurantMapProps {
  initialCenter: [number, number]
}

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, 13)
  }, [center, map])
  return null
}

export default function RestaurantMap({ initialCenter }: RestaurantMapProps) {
  const [center, setCenter] = useState<[number, number]>(initialCenter)
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null)
  const [placeName, setPlaceName] = useState<string>('')

  const handleSearchQuery = async (query: string) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
      const data = await response.json()
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0]
        const newPosition: [number, number] = [parseFloat(lat), parseFloat(lon)]
        setCenter(newPosition)
        setMarkerPosition(newPosition)
        setPlaceName(display_name)
      }
    } catch (error) {
      console.error('Error searching for location:', error)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).handleMapSearch = handleSearchQuery
    }
  }, [])

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer center={initialCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ChangeView center={center} />
        {markerPosition && (
          <Marker position={markerPosition} icon={redIcon}>
            <Popup>{placeName}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}
