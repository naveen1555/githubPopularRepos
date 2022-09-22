import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeButtonId: languageFiltersData[0].id,
    languagesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getLanguageList()
  }

  renderFailureView = () => (
    <div className="error-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="error-msg"
      />
      <h1 className="error-msg">Something Went Wrong</h1>
    </div>
  )

  getLanguageList = async () => {
    const {activeButtonId} = this.state

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://apis.ccbp.in/popular-repos?language=${activeButtonId}`

    const response = await fetch(url)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachLanguage => ({
        avatarUrl: eachLanguage.avatar_url,
        forksCount: eachLanguage.forks_count,
        id: eachLanguage.id,
        issuesCount: eachLanguage.issues_count,
        name: eachLanguage.name,
        starsCount: eachLanguage.stars_count,
      }))
      this.setState({
        languagesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  activeButtonDetails = id => {
    this.setState({activeButtonId: id}, this.getLanguageList)
  }

  renderLanguageCardsList = () => {
    const {languagesList} = this.state

    return (
      <ul className="languages-cards-items">
        {languagesList.map(eachCard => (
          <RepositoryItem key={eachCard.id} languageCardDetails={eachCard} />
        ))}
      </ul>
    )
  }

  renderLanguageFilteredLists = () => {
    const {activeButtonId} = this.state

    return (
      <ul className="language-list-items">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            languageDetails={eachLanguage}
            activeButtonDetails={this.activeButtonDetails}
            isActive={eachLanguage.id === activeButtonId}
          />
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <div>
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositaryList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderLanguageCardsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="popular-container">
          <h1 className="popular-heading">Popular</h1>
          {this.renderLanguageFilteredLists()}
          {this.renderRepositaryList()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
