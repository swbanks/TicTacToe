import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import Circle from './Circle';
import Cross from './Cross';

export default function App() {
  const [circles, setCircles] = useState([]);
  const [crosses, setCrosses] = useState([]);
  
  const setCoordinates = (touchedX) => {
    let val = Math.trunc(parseInt(touchedX) / 100) * 100 + 10; 
    console.log(`val = ${val}`);
    return val;
  };

  const onTouchingBoard = (e) => {
    
    const {locationX, locationY } = e.nativeEvent;
    let x = setCoordinates(locationX);
    let y = setCoordinates(locationY);

    if(crosses.length === circles.length) {
      setCrosses(crosses.concat([{translateX: x, translateY: y}]));
    } else {
      setCircles(circles.concat([{translateX: x, translateY: y}]));
    }

    console.log(`x = ${locationX}, y = ${locationY}`);
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
  }
});
