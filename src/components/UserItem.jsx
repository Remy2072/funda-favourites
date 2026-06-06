const ASSETS_BASE = 'https://fdnd-agency.directus.app/assets'

export default function UserItem({ user }) {
  const u = user.f_users_id
  return (
    <li className="member-item">
      <picture>
        {u.avatar ? (
          <>
            <source
              srcSet={`${ASSETS_BASE}/${u.avatar}?format=webp`}
              type="image/webp"
            />
            <img
              loading="lazy"
              src={`${ASSETS_BASE}/${u.avatar}`}
              width="25"
              height="25"
              alt={`Profielfoto van ${u.name}`}
            />
          </>
        ) : (
          <img
            loading="lazy"
            src="/assets/icons/icon-user.svg"
            width="25"
            height="25"
            alt="Profielfoto"
          />
        )}
      </picture>
      <p>{u.name}</p>
    </li>
  )
}
