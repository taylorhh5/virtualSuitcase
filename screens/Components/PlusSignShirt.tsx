
import React from 'react';
import { View, Image, ImageBackground, StyleSheet } from 'react-native';
const ShirtIconWithPlus: React.FC = () => {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../Icons/shirtIcon.png')}
          style={styles.shirtIcon}
          resizeMode="contain"
        >
          <View style={styles.plusSignContainer}>
            <View style={styles.plusSignHorizontal} />
            <View style={styles.plusSignVertical} />
          </View>
        </ImageBackground>
      </View>
    );
  };
  export default ShirtIconWithPlus
  
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    shirtIcon: {
      width: 130,
      height: 130,
    },
    plusSignContainer: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    plusSignHorizontal: {
      position: 'absolute',
      width: '24%',
      height: 3,
      backgroundColor: 'black',
    },
    plusSignVertical: {
      position: 'absolute',
      width: 3,
      height: '24%',
      backgroundColor: 'black',
    },
      dottedRectangleContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  dottedLine: {
    position: 'absolute',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'black',
  },
  dottedLineTop: {
    top: 0,
    left: '50%',
    width: 0,
    height: '50%',
  },
  dottedLineBottom: {
    bottom: 0,
    left: '50%',
    width: 0,
    height: '50%',
  },
  dottedLineLeft: {
    top: '50%',
    left: 0,
    width: '50%',
    height: 0,
  },
  dottedLineRight: {
    top: '50%',
    right: 0,
    width: '50%',
    height: 0,
  },
  });
  