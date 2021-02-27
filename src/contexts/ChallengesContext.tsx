import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallengesProviderProps {
  children: ReactNode
  level: number
  currentExperience: number
  challengesCompleted: number
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
  closeLevelUpModal: () => void
  completeChallenge: () => void
  levelUp: () => void
  startNewChallenge: () => void
  resetChallenge: () => void
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export const ChallengesProvider = ({ children, ...rest }: ChallengesProviderProps)=> {
  const [level, setLevel] = useState(rest.level | 1) 
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience | 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted | 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  const levelUp = () => {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  const closeLevelUpModal = () => setIsLevelUpModalOpen(false)

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

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted]);
  
  return (
    <ChallengesContext.Provider 
      value={{ 
        activeChallenge,
        challengesCompleted,
        currentExperience,
        experienceToNextLevel,
        level, 
        closeLevelUpModal,
        completeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}
