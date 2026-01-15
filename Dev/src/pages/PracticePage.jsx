import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { docsConfig } from '../data/docs-config'
import './PracticePage.css'

const PracticePage = () => {
  const { docId, practiceId } = useParams()
  const [PracticeComponent, setPracticeComponent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const doc = docsConfig.find(doc => doc.id === docId)
  const practice = doc?.practices.find(p => p.id === practiceId)

  useEffect(() => {
    const loadComponent = async () => {
      setLoading(true)
      setError(null)

      if (!practice?.component) {
        setError('컴포넌트를 찾을 수 없습니다.')
        setLoading(false)
        return
      }

      try {
        const module = await practice.component()
        setPracticeComponent(() => module.default)
      } catch (err) {
        console.error('컴포넌트 로드 실패:', err)
        setError('컴포넌트를 불러오는 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    loadComponent()
  }, [docId, practiceId, practice])

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
          {loading && <div className="practice-page__loading">로딩 중...</div>}
          {error && <p className="practice-page__error">{error}</p>}
          {PracticeComponent && <PracticeComponent />}
        </div>
      </div>
    </div>
  )
}

export default PracticePage
