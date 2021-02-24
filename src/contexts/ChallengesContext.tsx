import { createContext, useState, ReactNode } from 'react'
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

    setActiveChallenge(challenges[randomChallengeIndex])
  }

  const resetChallenge = () => setActiveChallenge(null)
  
  return (
    <ChallengesContext.Provider 
      value={{ 
        level, 
        levelUp,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        startNewChallenge,
        resetChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}
