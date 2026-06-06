import { useState, useEffect, useRef } from 'react'
import HouseCard from '../components/HouseCard.jsx'
import UserItem from '../components/UserItem.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'

const LIST_URL =
  'https://fdnd-agency.directus.app/items/f_list/6?fields=id,title,description,users.id,users.f_users_id.name,users.f_users_id.email,users.f_users_id.avatar,houses.id,houses.f_houses_id.id,houses.f_houses_id.street,houses.f_houses_id.house_nr,houses.f_houses_id.city,houses.f_houses_id.postal_code,houses.f_houses_id.price,houses.f_houses_id.m2,houses.f_houses_id.m2_garden,houses.f_houses_id.rooms,houses.f_houses_id.agent,houses.f_houses_id.poster_image.id,houses.f_houses_id.poster_image.width,houses.f_houses_id.poster_image.height'
const RATINGS_URL =
  'https://fdnd-agency.directus.app/items/f_feedback?fields=house,rating&filter[list][_eq]=6'

export default function FavorietenPage() {
  const [listData, setListData] = useState(null)
  const [loading, setLoading] = useState(true)
  const dialogListRef = useRef(null)
  const dialogLedenRef = useRef(null)

  useEffect(() => {
    document.title = 'Funda | Favorieten'

    Promise.all([
      fetch(LIST_URL).then((r) => r.json()),
      fetch(RATINGS_URL).then((r) => r.json()),
    ])
      .then(([listRes, ratingsRes]) => {
        const houses = listRes.data
        const ratings = ratingsRes.data.reverse()

        const updatedHouses = houses.houses.map((house) => {
          const found = ratings.find((r) => r.house === house.f_houses_id.id)
          return { ...house, rating: found ? found.rating.general : 0 }
        })

        setListData({ ...houses, houses: updatedHouses })
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="layout-container">
        <p>Laden...</p>
      </div>
    )
  }

  if (!listData) {
    return (
      <div className="layout-container">
        <p>Er is een fout opgetreden bij het laden van de favorieten.</p>
      </div>
    )
  }

  return (
    <div className="layout-container page-favourites">
      <Breadcrumbs items={['Home', 'Mijn Account', 'Favorieten']} />
      <h1>Favorieten</h1>
      <p>
        In dit overzicht vind je al je favoriete huizen terug. Maak het jezelf
        makkelijker door huizen te bewaren en notities toe te voegen over het
        huis, de buurt en andere belangrijke details voor je zoektocht.
      </p>

      <section>
        <h2>Leden</h2>
        <p>Alle leden van de favorieten lijst.</p>
        <ul className="member-list">
          {listData.users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </ul>
        <div className="option-row">
          <select className="btn-blue" defaultValue="Relevantie">
            <option>Relevantie</option>
            <option>Datum - nieuw naar oud</option>
            <option>Datum - oud naar nieuw</option>
            <option>Prijs - laag naar hoog</option>
            <option>Prijs - hoog naar laag</option>
            <option>Plaats - A tot Z</option>
            <option>Postcode - 1000 AA tot 9999 ZZ</option>
          </select>
          <button
            className="btn-blue btn-dialog"
            onClick={() => dialogListRef.current?.showModal()}
          >
            Lijst
          </button>
          <button
            className="btn-blue btn-dialog"
            onClick={() => dialogLedenRef.current?.showModal()}
          >
            Leden
          </button>
        </div>
      </section>

      <dialog id="dialog-list" ref={dialogListRef}>
        <div className="title-row">
          <h2>{listData.title}</h2>
          <button
            className="btn-close-dialog"
            onClick={() => dialogListRef.current?.close()}
          ></button>
        </div>
        <p>{listData.description}</p>
        <p>Leden: {listData.users.length}</p>
        <p>Huizen: {listData.houses.length}</p>
        <hr />
        <button
          className="btn-secondary-outline"
          onClick={() => dialogListRef.current?.close()}
        >
          Annuleren
        </button>
      </dialog>

      <dialog id="dialog-leden" ref={dialogLedenRef}>
        <div className="title-row">
          <h2>Leden</h2>
          <button
            className="btn-close-dialog"
            type="button"
            onClick={() => dialogLedenRef.current?.close()}
          ></button>
        </div>
        <p>Alle leden van de favorieten lijst.</p>
        <ul className="member-list">
          {listData.users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </ul>
        <hr />
        <h2>Nieuwe leden</h2>
        <p>Voeg nieuwe leden toe.</p>
        <input type="search" placeholder="Zoek naar nieuwe leden..." />
        <ul className="member-list"></ul>
        <button
          className="btn-secondary-outline"
          onClick={() => dialogLedenRef.current?.close()}
        >
          Annuleren
        </button>
        <button className="btn-primary-solid">Opslaan</button>
      </dialog>

      <ul className="favourites-grid">
        {listData.houses.map((currentHouse) => (
          <HouseCard
            key={currentHouse.id}
            house={currentHouse.f_houses_id}
            rating={currentHouse.rating}
          />
        ))}
        <li className="agent-card">
          <img
            src="/assets/icons/agent-img.svg"
            alt="vind een makelaar"
            width="104"
            height="104"
          />
          <h2>Overweeg je om te verkopen?</h2>
          <p>
            Een makelaar kan je helpen om de opties te bekijken die relevant
            zijn voor jou.
          </p>
          <a href="#" className="btn-agent">
            Vind een makelaar
          </a>
        </li>
      </ul>
    </div>
  )
}
