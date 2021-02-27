import { useContext, useEffect, useState } from 'react'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
  const { minutes, seconds, isActive, hasFinished, startCountdown, resetCountdown, setTime } = useContext(CountdownContext)

  const [isInputFocus, setIsInputFocus] = useState(false)
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')
  const [stateMinuteLeft, setStateMinuteLeft] = useState(minuteLeft)
  const [stateMinuteRight, setStateMinuteRight] = useState(minuteRight)
  const [stateSecondLeft, setStateSecondLeft] = useState(secondLeft)
  const [stateSecondRight, setStateSecondRight] = useState(secondRight)

  const setNewCountdown = (value: string, type: string) => {
    switch (type) {
      case 'secondRight':
        setStateSecondRight(value)
        break;
      case 'secondLeft':
        setStateSecondLeft(value)
        break;
      case 'minuteRight':
        setStateMinuteRight(value)
        break;
      case 'minuteLeft':
        setStateMinuteLeft(value)
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    setStateMinuteLeft(minuteLeft)
    setStateMinuteRight(minuteRight)
    setStateSecondLeft(secondLeft)
    setStateSecondRight(secondRight)
  }, [
    minuteLeft, 
    minuteRight, 
    secondLeft, 
    secondRight,
    setStateMinuteLeft,
    setStateMinuteRight,
    setStateSecondLeft,
    setStateSecondRight
  ])

  useEffect(() => {
    const seconds = parseInt(stateSecondLeft + stateSecondRight) / 60
    const minutes = parseInt(stateMinuteLeft + stateMinuteRight)
    const time = minutes + seconds

    // TODO: fix logic valid
    // if(time < 10) {
    //   setTime(600)
    // } else if(time > 60) {
    //   setTime(60)
    // } else {
    //   setTime(time * 60)
    // }
    setTime(time * 60)
  }, [
    stateMinuteLeft,
    stateMinuteRight,
    stateSecondLeft,
    stateSecondRight
  ])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          {isInputFocus ? (
            <input 
              min={0}
              max={6}
              disabled={isActive}
              type="number" 
              onMouseLeave={() => setIsInputFocus(false)} 
              value={stateMinuteLeft} 
              onChange={value => setNewCountdown(value.target.value, 'minuteLeft')} 
            />
          ) : (
            <span onMouseEnter={() => setIsInputFocus(true)}>{stateMinuteLeft}</span>
          )}
          {isInputFocus ? (
            <input 
              min={0}
              max={9}
              disabled={isActive}
              type="number" 
              onMouseLeave={() => setIsInputFocus(false)} 
              value={stateMinuteRight} 
              onChange={value => setNewCountdown(value.target.value, 'minuteRight')} 
            />
          ) : (
            <span onMouseEnter={() => setIsInputFocus(true)}>{stateMinuteRight}</span>
          )}
        </div>
        <span>:</span>
        <div>
          {isInputFocus ? (
            <input 
              min={0}
              max={6}
              disabled={isActive}
              type="number" 
              onMouseLeave={() => setIsInputFocus(prevState => !prevState)} 
              value={stateSecondLeft} 
              onChange={value => setNewCountdown(value.target.value, 'secondLeft')} 
            />
          ) : (
            <span onMouseEnter={() => setIsInputFocus(true)}>{stateSecondLeft}</span>
          )}
          {isInputFocus ? (
            <input 
              min={0}
              max={9}
              disabled={isActive}
              type="number" 
              onMouseLeave={() => setIsInputFocus(false)} 
              value={stateSecondRight} 
              onChange={value => setNewCountdown(value.target.value, 'secondRight')} 
            />
          ) : (
            <span onMouseEnter={() => setIsInputFocus(true)}>{stateSecondRight}</span>
          )}
        </div>
      </div>
      {hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      ) : (isActive ? (
          <button 
            type="button" 
            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
            onClick={resetCountdown} 
          >
            Abandonar ciclo
          </button>
        ) : (
          <button 
            type="button" 
            className={styles.countdownButton}
            onClick={startCountdown}
          >
            Iniciar um ciclo
          </button>
        )
      )}
    </div>
  )
}