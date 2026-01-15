import { useParams, Link } from 'react-router-dom'
import { docsConfig } from '../data/docs-config'
import './DocPage.css'

const DocPage = () => {
  const { docId } = useParams()
  const doc = docsConfig.find(doc => doc.id === docId)

  if (!doc) {
    return (
      <div className="doc-page">
        <div className="doc-page__container">
          <p>해당 문서를 찾을 수 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="doc-page">
      <div className="doc-page__container">
        <header className="doc-page__header">
          <Link to="/" className="doc-page__back-link">
            ← 홈으로
          </Link>
          <h1 className="doc-page__title">{doc.title}</h1>
        </header>
        <section className="doc-page__practices">
          <h2 className="doc-page__practices-title">연습 항목</h2>
          <ul className="doc-page__practices-list">
            {doc.practices.map(practice => (
              <li key={practice.id} className="doc-page__practice-item">
                <Link
                  to={`/docs/${docId}/practices/${practice.id}`}
                  className="doc-page__practice-link"
                >
                  <div className="doc-page__practice-info">
                    <h3 className="doc-page__practice-title">{practice.title}</h3>
                    <p className="doc-page__practice-description">{practice.description}</p>
                    <div className="doc-page__practice-meta">
                      <span className="doc-page__practice-level">{practice.level}</span>
                    </div>
                  </div>
                  <span className="doc-page__practice-arrow">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default DocPage
