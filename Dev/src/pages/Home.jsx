import { Link } from 'react-router-dom'
import { docsConfig } from '../data/docs-config'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <header className="home__header">
          <h1 className="home__title">프론트엔드 학습 가이드</h1>
          <p className="home__subtitle">체계적인 프론트엔드 개발 지식을 단계별로 학습합니다</p>
        </header>
        <ul className="home__docs-list">
          {docsConfig.map(doc => {
            return (
              <li key={doc.id} className="home__doc-item">
                <Link to={`/docs/${doc.id}`} className="home__doc-link">
                  {doc.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
export default Home
