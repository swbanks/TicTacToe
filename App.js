import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import Circle from './Circle';
import Cross from './Cross';

export default function App() {
  const initialPositionState = [['', '', ''],['', '', ''],['', '', '']];
  const [circles, setCircles] = useState([]);
  const [crosses, setCrosses] = useState([]);
  const [positionTracker, setPositionTracker] = useState(initialPositionState);
  
  let xWins = false;
  let oWins = false;
  const winningCoordinates = [[[0,0], [1,0], [2,0]], [[0,1], [1,1], [2,1]], [[0,2], [1,2], [2,2]], [[0,0], [0,1], [0,2]], [[1,0], [1,1], [1,2]], [[2,0], [2,1], [2,2]], [[0,0], [1,1], [2,2]], [[0,2], [1,1], [2,0]]];
  winningCoordinates.some((triplet) => {
    let firstCoordinate = positionTracker[triplet[0][0]][triplet[0][1]];
    let secondCoordinate = positionTracker[triplet[1][0]][triplet[1][1]];
    let thirdCoordinate = positionTracker[triplet[2][0]][triplet[2][1]];
    
    if(firstCoordinate === 'X' && secondCoordinate === 'X' && thirdCoordinate == 'X')
    {
      xWins = true;
      return true;
    } else if (firstCoordinate === 'O' && secondCoordinate === 'O' && thirdCoordinate == 'O') {
      oWins = true;
      return true;
    }
    return false;
  });

  const getArrayIndex = (coordinate) => {
    return (coordinate - 10) / 100;
  };

  const getCoordinates = (touchedX) => {
    let val = Math.trunc(parseInt(touchedX) / 100) * 100 + 10; 
    console.log(`val = ${val}`);
    return val;
  };

  const handleResetPress = () => {
    setCircles([]);
    setCrosses([]);
    setPositionTracker(initialPositionState);
  }

  const isSpotOnBoardTaken = (x, y) => {
    return positionTracker[getArrayIndex(x)][getArrayIndex(y)] !== '';
  };

  const onTouchingBoard = (e) => {
    if (xWins || oWins) return;
    const {locationX, locationY } = e.nativeEvent;
    let x = getCoordinates(locationX);
    let y = getCoordinates(locationY);

    if (isSpotOnBoardTaken(x, y)) return; 
    let positions = positionTracker;
    if(crosses.length === circles.length) {
      positions[getArrayIndex(x)][getArrayIndex(y)] = 'X';
      setPositionTracker(positions);
      setCrosses(crosses.concat([{translateX: x, translateY: y}]));
    } else {
      positions[getArrayIndex(x)][getArrayIndex(y)] = 'O';
      setPositionTracker(positions);
      setCircles(circles.concat([{translateX: x, translateY: y}]));
    }

    console.log(`positions array = ${positions}`);
  };

  return (
    <View>
    <TouchableWithoutFeedback onPress={e => onTouchingBoard(e)}>
      <View style={styles.board}>
        <View style={styles.vline} />
        <View style={[styles.vline, {transform: [{translateX: 200}, { translateY: 0 }]}]} />
        <View style={styles.hline} />
        <View style={[styles.hline, {transform: [{translateX: 0}, { translateY: 200 }]}]} />
        {crosses.map((e) => (<Cross color='red' key={crosses.indexOf(e)} xTranslate={e.translateX} yTranslate={e.translateY}/>))}
        {circles.map((e) => (<Circle color='skyblue' key={circles.indexOf(e)} xTranslate={e.translateX} yTranslate={e.translateY}/>))}
      </View>
    </TouchableWithoutFeedback >
    <Text style={styles.text}>
      {xWins ? 'X wins!' : (oWins ? 'O Wins!' : '')}
    </Text>
    <TouchableHighlight onPress={handleResetPress} style={[styles.button, {marginTop: 50}]}>
      <Text style={styles.buttonText}>{xWins || oWins ? 'Play Again' : 'Reset'}</Text>
    </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    borderColor: '#fff',
    borderWidth: 3,
    height: 312,
    width: 312,
    transform: [
      { translateX: 25 },
      { translateY: 50 }
     ]
  },
  vline: {
    backgroundColor: '#000',
    height: 306,
    width: 3,
    position: 'absolute',
    transform: [
     { translateX: 100 },
     { translateY: 0 }
    ]
  },
  hline: {
    backgroundColor: '#000',
    height: 3,
    width: 306,
    position: 'absolute',
    transform: [
     { translateX: 0 },
     { translateY: 100 }
    ]
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    alignSelf: 'stretch',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  text: {
    color: 'green',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 100,
    textAlign: 'center'
  }
});
