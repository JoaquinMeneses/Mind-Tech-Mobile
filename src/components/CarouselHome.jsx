import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

function CarouselHeader() {
    const images = [
      { id: 1, source: require('./../../assets/images/rectangle-32.png') },
      { id: 2, source: require('./../../assets/images/rectangle-32.png') },
      { id: 3, source: require('./../../assets/images/rectangle-32.png') },
    ];

    const [activeSlide, setActiveSlide] = useState(0);
  
    const renderItem = ({ item }) => {
      return (
        <View style={styles.slide}>
          <Image source={item.source} style={styles.image} />
        </View>
      );
    };
  
    return (
        <View style={styles.container}>
        <Carousel
          data={images}
          renderItem={renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <Pagination
          dotsLength={images.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.dotStyle}
          inactiveDotStyle={styles.inactiveDotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
        top: 45,
        width: Dimensions.get('window').width,
        alignItems: 'center',
    },
    slide: {
        width: '100%',
        height: 200,
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: '80%',
        borderRadius: 18,
        alignItems: 'center',
    },
    paginationContainer: {
        position: 'absolute',
        bottom: -10,
      },
      dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 2,
        backgroundColor: '#00a524da',
      },
      inactiveDotStyle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'gray',
      },
  });
  
  

export default CarouselHeader