import { createContext, useState, ReactNode } from 'react'

interface ChallengesProviderProps {
  children: ReactNode
}

interface ChallengesContextData {
  level: number
  levelUp: () => void
  currentExperience: number
  challengeCompleted: number
  startNewChallenge: () => void
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export const ChallengesProvider = ({ children }: ChallengesProviderProps)=> {
  const [level, setLevel] = useState(1) 
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengeCompleted, setChallengeCompleted] = useState(0);

  const levelUp = () => setLevel(level + 1)

  const startNewChallenge = () => {
    console.log('new challenge');
    
  }
  
  return (
    <ChallengesContext.Provider 
      value={{ 
        level, 
        levelUp,
        currentExperience,
        challengeCompleted,
        startNewChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}
