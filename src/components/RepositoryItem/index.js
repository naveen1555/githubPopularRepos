import './index.css'

const RepositoryItem = props => {
  const {languageCardDetails} = props

  const {
    avatarUrl,
    forksCount,
    issuesCount,
    name,
    starsCount,
  } = languageCardDetails

  return (
    <li className="language-card-container">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <h1 className="name">{name}</h1>
      <div className="small-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="image"
        />
        <p className="count">{starsCount} stars</p>
      </div>
      <div className="small-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="image"
        />
        <p className="count">{forksCount} forks</p>
      </div>
      <div className="small-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="image"
        />
        <p className="count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
