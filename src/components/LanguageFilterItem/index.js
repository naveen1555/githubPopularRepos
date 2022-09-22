import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, activeButtonDetails, isActive} = props
  const {id, language} = languageDetails

  const btnClass = isActive ? 'active-tab-button' : 'inactive-tab-button'

  const onClickTabItem = () => {
    activeButtonDetails(id)
  }

  return (
    <li className="list-item">
      <button type="button" className={btnClass} onClick={onClickTabItem}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
