import { useState } from 'react'
import './ScrollPerformance.css'

const ScrollPerformance = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [useTransform, setUseTransform] = useState(true)

  const handleMouseMove = (e) => {
    if (useTransform) {
      setPosition({ x: e.clientX, y: e.clientY })
    } else {
      // 나쁜 예: left/top 사용 (Layout 발생)
      setPosition({ x: e.clientX, y: e.clientY })
    }
  }

  return (
    <div className="scroll-performance">
      <div className="scroll-performance__header">
        <h2>스크롤 성능 이슈 실습</h2>
        <p>
          이 실습에서는 성능에 유리한 애니메이션 속성(transform/opacity)과
          그렇지 않은 속성(left/top)의 차이를 비교해봅니다.
        </p>
      </div>

      <div className="scroll-performance__controls">
        <label>
          <input
            type="checkbox"
            checked={useTransform}
            onChange={(e) => setUseTransform(e.target.checked)}
          />
          <span>transform 사용 (권장)</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={!useTransform}
            onChange={(e) => setUseTransform(!e.target.checked)}
          />
          <span>left/top 사용 (비권장)</span>
        </label>
      </div>

      <div
        className="scroll-performance__demo-area"
        onMouseMove={handleMouseMove}
      >
        <div
          className={`scroll-performance__box ${
            useTransform ? 'scroll-performance__box--transform' : 'scroll-performance__box--position'
          }`}
          style={
            useTransform
              ? {
                  transform: `translate(${position.x - 50}px, ${position.y - 50}px)`,
                }
              : {
                  left: `${position.x - 50}px`,
                  top: `${position.y - 50}px`,
                }
          }
        >
          {useTransform ? '✅ transform' : '❌ left/top'}
        </div>
      </div>

      <div className="scroll-performance__info">
        <h3>성능 비교 방법</h3>
        <ol>
          <li>Chrome DevTools를 열고 Performance 탭을 엽니다</li>
          <li>녹화를 시작하고 마우스를 움직여봅니다</li>
          <li>
            <strong>transform 사용</strong>: Composite만 발생 (초록색)
          </li>
          <li>
            <strong>left/top 사용</strong>: Layout + Paint 발생 (노란색/보라색)
          </li>
        </ol>

        <h3>핵심 개념</h3>
        <ul>
          <li>
            <strong>Layout (Reflow)</strong>: 요소의 위치와 크기를 재계산 (가장 비용 큼)
          </li>
          <li>
            <strong>Paint</strong>: 실제 픽셀을 그리는 과정 (중간 비용)
          </li>
          <li>
            <strong>Composite</strong>: 여러 레이어를 합성 (가장 가벼움, GPU 가속 가능)
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ScrollPerformance
