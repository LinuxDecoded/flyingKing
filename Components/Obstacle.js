import React from "react"
import { View } from "react-native"
import stylesheet from "./stylesheet"

const Obstacle = ({obstaclePosX, obstacleHeight, randomBottom}) => {
    let gap = 200

    return(
        <>
            <View style={[stylesheet.obstacle, stylesheet.obstacleUp, {height: obstacleHeight, left: obstaclePosX, bottom: randomBottom}]}/>
            <View style={[stylesheet.obstacle, stylesheet.obstacleDown, {height: obstacleHeight, left: obstaclePosX, bottom: randomBottom + obstacleHeight + gap}]}/>
        </>
    )
}

export default Obstacle