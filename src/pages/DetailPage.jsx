import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const formatPrice = (price) => {
  if (!price) return '0'
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export default function DetailPage() {
  const { id } = useParams()
  const [house, setHouse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://fdnd-agency.directus.app/items/f_houses/${id}?fields=*.*.*.*`)
      .then((r) => r.json())
      .then((data) => {
        setHouse(data.data)
        document.title = `Funda | ${data.data.street} ${data.data.house_nr}`
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <p style={{ padding: '1rem' }}>Laden...</p>
  }

  if (!house) {
    return <p style={{ padding: '1rem' }}>Huis niet gevonden.</p>
  }

  return (
    <>
      <figure>
        <img
          src={`https://fdnd-agency.directus.app/assets/${house.poster_image?.id}`}
          height={house.poster_image?.height}
          width={house.poster_image?.width}
          alt={`Foto van ${house.street} ${house.house_nr}`}
        />
      </figure>
      <div className="house-container">
        <h1 className="house-name">
          {house.street} {house.house_nr} {house.nr_addition}
        </h1>
        <p className="house-code">
          {house.postal_code} {house.city}
        </p>
        <p className="house-width">
          {house.m2} m² / {house.m2_garden} m² {house.rooms} kamers
        </p>
        <p className="house-agent">{house.agent}</p>
        <p className="house-price">
          € <span>{formatPrice(house.price)}</span> k.k.
        </p>
        <h2 className="heading">Omschrijving</h2>
        <p dangerouslySetInnerHTML={{ __html: house.description }} />
      </div>
    </>
  )
}
