import { Link } from 'react-router-dom'
import RatingForm from './RatingForm.jsx'

const ASSETS_BASE = 'https://fdnd-agency.directus.app/assets'

const formatPrice = (price) => {
  if (!price) return '0'
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export default function HouseCard({ house, rating }) {
  return (
    <li className="house-card">
      <Link to={`/detail/${house.id}`}>
        <picture>
          <source
            srcSet={`${ASSETS_BASE}/${house.poster_image?.id}?format=avif`}
            type="image/avif"
          />
          <source
            srcSet={`${ASSETS_BASE}/${house.poster_image?.id}?format=webp`}
            type="image/webp"
          />
          <img
            src={`${ASSETS_BASE}/${house.poster_image?.id}`}
            alt={house.title || `${house.street} ${house.house_nr}`}
            height={house.poster_image?.height}
            width={house.poster_image?.width}
            loading="lazy"
          />
        </picture>
      </Link>
      <div className="card-container">
        <Link to={`/detail/${house.id}`}>
          <h2>
            {house.street} {house.house_nr}
          </h2>
        </Link>
        <p>
          {house.postal_code}
          {house.postal_code?.endsWith(' ') ? '' : ' '}
          {house.city}
        </p>
        <p className="price">€{formatPrice(house.price)} k.k.</p>
        <ul className="info-list">
          <li className="info-item">{house.m2 ? `${house.m2} m²` : 0}</li>
          <li className="info-item">{house.rooms ?? 0}</li>
          <li className="info-item">{house.m2_garden ? `${house.m2_garden} m²` : 0}</li>
        </ul>
        <p>{house.agent}</p>
        <RatingForm house={house} initialRating={rating} />
      </div>
    </li>
  )
}
