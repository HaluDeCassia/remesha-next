import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/ChallengeBox.module.css'

const Titles = {
  body: 'Exercite-se',
  eye: 'Mova os olhos'
}

export function ChallengeBox() {
  const { activeChallenge, completeChallenge, resetChallenge } = useContext(ChallengesContext)

  const { resetCountdown } = useContext(CountdownContext)

  const randomChallengeCompleted = () => {
    completeChallenge()
    resetCountdown()
  }
  const randomChallengeFailed = () => {
    resetChallenge()
    resetCountdown()
  }
  
  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="Body" />
            <strong>{Titles[activeChallenge.type]}</strong>
            <p>
              {activeChallenge.description}
            </p>
          </main>

          <footer>
            <button 
              type="button"
              className={styles.challengeFailedButton}
              onClick={randomChallengeFailed}
            >
              Falhei
            </button>
            <button 
              type="button"
              className={styles.challengeCompletedButton}
              onClick={randomChallengeCompleted}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Inicie um ciclo para receber desafios</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level up" />
            Avance de level completando os desafios.
          </p>
        </div>
      )}
    </div>
  )
}