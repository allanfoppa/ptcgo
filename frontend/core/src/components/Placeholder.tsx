import img from '../assets/images/placeholder-image.webp'

export const PlaceholderText = () => {
  return(
    <p>Error to load</p>
  )
}

export const PlaceholderImage = () => {
  return(
    <img src={img} alt='Image not loaded' />
  )
}
