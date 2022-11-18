import React, { useEffect, useState } from "react"
import { Dimensions, TouchableWithoutFeedback, View, Image, Text, ToastAndroid } from "react-native"
import King from "./King"
import Obstacle from "./Obstacle"
import stylesheet from "./stylesheet"

const Game = () => {
  let screenHeight = Dimensions.get("screen").height
  let screenWidth = Dimensions.get("screen").width
  let kingTimer
  let obstacleTimer
  let obstacleTimerSecond
  let obstacleHeight = screenHeight/2
  let objectWidth = 20
  let gap = 200
  
  const [kingPosY, setKingPos] = useState(screenHeight/2)
  const [firstObstaclePosX, setObstaclePos] = useState(screenWidth)
  const [secondObstaclePosX, setObstaclePosSecond] = useState(screenWidth + screenWidth/2 + 30)
  const [obstacleBottomRand, setObstacleBottomRand] = useState(0)
  const [obstacleBottomRandSecond, setObstacleBottomRandSecond] = useState(0)
  const [isGameOver, setIsGameOver] = useState(true)
  const [score, setScore] = useState(0)
  const [newScore, setNewScore] = useState(0)

  useEffect(()=>{
    if(kingPosY>0) {
      kingTimer = setInterval(()=> {
        setKingPos(kingPosY=>kingPosY-5)
      }, 30)
      return ()=> {clearInterval(kingTimer)}
    }
  }, [kingPosY])

  useEffect(()=>{
    if(firstObstaclePosX>-objectWidth) {
      obstacleTimer = setInterval(()=> {
        setObstaclePos(firstObstaclePosX=>firstObstaclePosX-5)
      }, 30)
      return ()=> {clearInterval(obstacleTimer)}
    }
    else {
      setNewScore(score=>score=score+1)
      setObstaclePos(current=>current=screenWidth)
      setObstacleBottomRand(-Math.random() *200)
    }
  }, [firstObstaclePosX])

  useEffect(()=>{
    if(secondObstaclePosX>-objectWidth) {
      obstacleTimerSecond = setInterval(()=> {
        setObstaclePosSecond(secondObstaclePosX=>secondObstaclePosX-5)
      }, 30)
      return ()=> {clearInterval(obstacleTimerSecond)}
    }
    else {
      setNewScore(score=>score=score+1)
      setObstaclePosSecond(current=>current=screenWidth)
      setObstacleBottomRandSecond(-Math.random() * 200)
    }
  }, [secondObstaclePosX])

  const jump = () => {
    if(!isGameOver && kingPosY < screenHeight) {
      setKingPos(kingPosY=>kingPosY + 50)
    }
  }

  useEffect(()=>{
    if(((kingPosY < (obstacleBottomRand + obstacleHeight + 50) ||
    kingPosY > (obstacleBottomRand + obstacleHeight + gap )) &&
    (firstObstaclePosX > screenWidth/2 -25 && firstObstaclePosX < screenWidth/2 + 25 )
    )
    || 
    ((kingPosY < (obstacleBottomRandSecond + obstacleHeight + 50) ||
    kingPosY > (obstacleBottomRandSecond + obstacleHeight + gap )) &&
    (secondObstaclePosX > screenWidth/2 -25 && secondObstaclePosX < screenWidth/2 + 25 )
    )) {
      gameOver()
    }
  })

  const gameOver = () => {
    clearInterval(kingTimer)
    clearInterval(obstacleTimer)
    clearInterval(obstacleTimerSecond)
    setIsGameOver(isGameOver=>isGameOver=true)
    if(newScore > score) {
      setScore(score=>score=newScore)
    }
  }

  useEffect(()=> {
    if(isGameOver==false) {
      setKingPos(screenHeight/2)
      setObstaclePos(screenWidth)
      setObstaclePosSecond(screenWidth + screenWidth/2 + 30)
      setObstacleBottomRand(0)
      setObstacleBottomRandSecond(0)
    }
    if(isGameOver==true && newScore>0) {
      ToastAndroid.show(`Your Score: ${newScore}`, ToastAndroid.SHORT)
    }
  }, [isGameOver])

  const startGame = () => {
    setIsGameOver(isGameOver=>isGameOver=false)
    setNewScore(score=>score=0)
  }

  return(
    <>
      {
        isGameOver==true ? 
            
            <TouchableWithoutFeedback onPress={startGame}>
              <View style={stylesheet.overlay}>
                <Text style={[stylesheet.gameName, {bottom: screenHeight/10}]}>Flying King</Text>
                <Image style={stylesheet.playButton} source={require('../assets/play.png')}/>
                {isGameOver && <Text style={[stylesheet.score, {top: screenHeight/12}]}>High Score: {score}</Text>}
              </View>
            </TouchableWithoutFeedback> : 
            
            <TouchableWithoutFeedback onPress={jump}>
              <View style={stylesheet.container}>
                <King kingPosY={kingPosY}/>
                <Obstacle obstaclePosX={firstObstaclePosX} obstacleHeight={obstacleHeight} randomBottom={obstacleBottomRand}/>
                <Obstacle obstaclePosX={secondObstaclePosX} obstacleHeight={obstacleHeight} randomBottom={obstacleBottomRandSecond}/>
              </View>
            </TouchableWithoutFeedback>
      }
    </>
  )
}

export default Game