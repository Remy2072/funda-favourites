import { useState } from 'react'
import confetti from 'canvas-confetti'
import Toastify from 'toastify-js'

export default function RatingForm({ house, initialRating }) {
  const [rating, setRating] = useState(Number(initialRating) || 0)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  async function handleChange(newRating) {
    if (loading) return
    setLoading(true)
    setShowSuccess(false)

    if (newRating === 5) {
      confetti({
        spread: 120,
        startVelocity: 10,
        shapes: ['star'],
        colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
        particleCount: 15,
        scalar: 0.8,
      })
    }

    try {
      await fetch('https://fdnd-agency.directus.app/items/f_feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          house: house.id,
          list: 6,
          user: 6,
          rating: { general: newRating },
        }),
      })

      setRating(newRating)
      setLoading(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (err) {
      setLoading(false)
      Toastify({
        text: 'Beoordeling niet opgeslagen. Probeer het later nog eens.',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: { background: 'linear-gradient(to right, #ad2429, #9e181c)' },
      }).showToast()
    }
  }

  return (
    <div className="rating-form">
      <div className={`loader${loading ? '' : ' hidden'}`}></div>
      <svg
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
        width="24"
        height="24"
        className="rating-success"
      >
        <path
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          fillRule="evenodd"
          className={`tick${showSuccess ? ' draw' : ''}`}
          d="M6.5 13.5L10 17 l8.808621-8.308621"
        />
      </svg>
      {[1, 2, 3, 4, 5].map((i) => (
        <input
          key={i}
          type="radio"
          name={`rating-${house.id}`}
          value={i}
          checked={rating === i}
          onChange={() => handleChange(i)}
        />
      ))}
    </div>
  )
}
