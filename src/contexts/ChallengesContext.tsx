import { createContext, useState, ReactNode, useEffect } from 'react'
import challenges from '../../challenges.json'

interface ChallengesProviderProps {
  children: ReactNode
}

interface ChallengeProps {
  type: 'body' | 'eye'
  description: string
  amount: number
}

interface ChallengesContextData {
  activeChallenge: ChallengeProps
  challengesCompleted: number
  currentExperience: number
  experienceToNextLevel: number
  level: number
  completeChallenge: () => void
  levelUp: () => void
  startNewChallenge: () => void
  resetChallenge: () => void
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export const ChallengesProvider = ({ children }: ChallengesProviderProps)=> {
  const [level, setLevel] = useState(1) 
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  const levelUp = () => setLevel(level + 1)

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    new Audio('/notification.mp3').play()

    setActiveChallenge(challenge)

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio!', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  const resetChallenge = () => setActiveChallenge(null)
 
  const completeChallenge = () => {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted +1)
  }

  useEffect(() => {
    Notification.requestPermission()
  }, [])
  
  return (
    <ChallengesContext.Provider 
      value={{ 
        activeChallenge,
        challengesCompleted,
        currentExperience,
        experienceToNextLevel,
        level, 
        completeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}
