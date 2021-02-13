import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
const { width } = Dimensions.get('window');

class RNCarousel extends React.PureComponent {
  intervalId = '';

  state = {
    interval: 0,
  };

  componentDidMount() {
    const { loop } = this.props;
    setTimeout(() => {
      if (loop) {
        intervalId = setInterval(() => this.scrollTo('right'), 4000);
      }
    }, 10);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  onScroll = data => {
    this.setState({
      width: data.nativeEvent.contentSize.width,
      interval: Math.ceil((data.nativeEvent.contentOffset.x / data.nativeEvent.layoutMeasurement.width).toFixed(2)),
    });
  };

  scrollTo = direction => {
    const { data } = this.props;
    const { interval } = this.state;
    if (this.scrollView && direction === 'left') {
      if (interval - 1 === 0) {
        this.scrollView.scrollTo({ x: width * (data.length - 1), y: 0, animated: true });
      } else {
        this.scrollView.scrollTo({ x: width * (interval - 1), y: 0, animated: true });
      }
    } else if (this.scrollView && direction === 'right') {
      if (interval + 1 === data.length) {
        this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
      } else {
        this.scrollView.scrollTo({ x: width * (interval + 1), y: 0, animated: true });
      }
    }
  }

  render() {
    const {
      data,
      imageResizeMode,
      indicatorBorderColor,
      indicatorActiveBackgroundColor,
      height,
      arrowSize,
      showArrows,
      showIndicator,
      showsHorizontalScrollIndicator,
      contentContainerStyle,
      indicatorContainerStyle,
      indicatorStyle,
      isLocal,
      isCustomCarouselContent,
      carouselContent,
    } = this.props;
    const { interval } = this.state;
    return (
      <View style={{ ...styles.container, height }}>
        {showArrows && <TouchableOpacity style={styles.leftArrow} onPress={() => this.scrollTo('left')}>
          <Image style={{ width: arrowSize, height: arrowSize }} source={require('../assets/left.png')} />
        </TouchableOpacity>}
        <ScrollView
          horizontal={true}
          ref={ref => (this.scrollView = ref)}
          contentContainerStyle={{ ...styles.scrollView, ...contentContainerStyle }}
          showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
          onScroll={data => this.onScroll(data)}
          scrollEventThrottle={200}
          pagingEnabled
          decelerationRate="fast">
          <View style={styles.carouselContainer}>
            <View style={styles.carouselContent}>
              {!isCustomCarouselContent && data && data.length > 0 && data.map((item, index) => {
                return <Image key={`index-images-${index}`} style={{ resizeMode: imageResizeMode, height: height, width: width }} source={isLocal ? require(item.loc) : { uri: item.url }} />;
              })}
              {
                isCustomCarouselContent && <>{carouselContent}</>
              }
            </View>
          </View>
        </ScrollView>
        {showArrows && <TouchableOpacity style={styles.rightArrow} onPress={() => this.scrollTo('right')}>
          <Image style={{ width: arrowSize, height: arrowSize }} source={require('../assets/right.png')} />
        </TouchableOpacity>}
        {showIndicator && <View style={{ ...styles.indicatorContainer, ...indicatorContainerStyle }}>
          {data &&
            data.map((item, index) => {
              return (
                <View
                  key={`index-bullets-${index}`}
                  style={{
                    ...styles.indicatorContent,
                    borderColor: indicatorBorderColor,
                    ...indicatorStyle,
                    ...(interval === index ? { backgroundColor: indicatorActiveBackgroundColor } : {}),
                  }}></View>
              );
            })}
        </View>}
      </View>
    );
  }
}

RNCarousel.propTypes = {
  data: PropTypes.array,
  imageResizeMode: PropTypes.string,
  indicatorBorderColor: PropTypes.string,
  indicatorActiveBackgroundColor: PropTypes.string,
  height: PropTypes.number,
  arrowSize: PropTypes.number,
  loop: PropTypes.bool,
  showArrows: PropTypes.bool,
  showIndicator: PropTypes.bool,
  isCustomCarouselContent: PropTypes.bool,
  isLocal: PropTypes.bool,
  showsHorizontalScrollIndicator: PropTypes.bool,
  indicatorStyle: PropTypes.object,
  contentContainerStyle: PropTypes.object,
  indicatorContainerStyle: PropTypes.object,
  carouselContent: PropTypes.componentOrElement,
};

RNCarousel.defaultProps = {
  data: [],
  imageResizeMode: 'cover',
  indicatorBorderColor: 'white',
  indicatorActiveBackgroundColor: 'white',
  height: 200,
  arrowSize: 25,
  loop: true,
  showArrows: true,
  showIndicator: true,
  isCustomCarouselContent: false,
  isLocal: true,
  showsHorizontalScrollIndicator: false,
  indicatorStyle: {},
  contentContainerStyle: {},
  indicatorContainerStyle: {},
};

export default RNCarousel;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  carouselContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  carouselContent: {
    flexBasis: '100%',
    flex: 1,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  leftArrow: {
    position: 'absolute',
    left: 10,
    top: '50%',
    bottom: 0,
    zIndex: 10
  },
  rightArrow: {
    position: 'absolute',
    right: 10,
    top: '50%',
    bottom: 0,
    zIndex: 10
  },
  indicatorContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 10,
  },
  indicatorContent: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    marginVertical: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 4,
  },
});
