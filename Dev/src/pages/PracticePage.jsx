import { useParams, Link } from 'react-router-dom'
import { docsConfig } from '../data/docs-config'
import './PracticePage.css'

const PracticePage = () => {
  const { docId, practiceId } = useParams()
  const doc = docsConfig.find(doc => doc.id === docId)
  const practice = doc?.practices.find(p => p.id === practiceId)

  if (!doc || !practice) {
    return (
      <div className="practice-page">
        <div className="practice-page__container">
          <p>해당 연습을 찾을 수 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="practice-page">
      <div className="practice-page__container">
        <header className="practice-page__header">
          <nav className="practice-page__breadcrumb">
            <Link to="/" className="practice-page__breadcrumb-link">
              홈
            </Link>
            <span className="practice-page__breadcrumb-separator">/</span>
            <Link to={`/docs/${docId}`} className="practice-page__breadcrumb-link">
              {doc.title}
            </Link>
            <span className="practice-page__breadcrumb-separator">/</span>
            <span>{practice.title}</span>
          </nav>
          <h1 className="practice-page__title">{practice.title}</h1>
          <div className="practice-page__meta">
            <span className="practice-page__level">{practice.level}</span>
            {practice.description && (
              <p className="practice-page__description">{practice.description}</p>
            )}
          </div>
        </header>
        <div className="practice-page__content">
          <Link to={`/docs/${docId}`} className="practice-page__back-button">
            ← 목록으로 돌아가기
          </Link>
          <p>연습 내용이 여기에 표시됩니다.</p>
        </div>
      </div>
    </div>
  )
}

export default PracticePage
