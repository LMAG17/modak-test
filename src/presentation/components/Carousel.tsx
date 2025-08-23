import React, { useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
  CarouselRenderItem,
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { groupByChunks } from '../../domain/usecases/groupByChunks';

const { width: screenWidth } = Dimensions.get('window');

type Props = {
  autoPlay?: boolean;
  loop?: boolean;
  data: any[] | undefined;
  itemsPerPage: number;
  onPress?: (id: number) => void;
  renderItem: CarouselRenderItem<any[]>;
};

export function CustomCarousel({
  data = [],
  renderItem,
  itemsPerPage,
  autoPlay,
  loop,
}: Props) {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }
  const isDisabled = !data || data.length <= 1;
  const progress = useSharedValue<number>(0);
  const productChunks = groupByChunks(data, itemsPerPage);
  const ref = useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        autoPlay={autoPlay}
        loop={isDisabled ? false : loop}
        onProgressChange={progress}
        width={screenWidth}
        height={300}
        data={productChunks}
        scrollAnimationDuration={800}
        autoPlayInterval={2000}
        renderItem={renderItem}
      />
      {!isDisabled && (
        <Pagination.Basic
          progress={progress}
          data={productChunks}
          size={12}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          containerStyle={[styles.dotContainerStyle]}
          horizontal
          onPress={onPressPagination}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
  },
  dotStyle: {
    borderRadius: 100,
    backgroundColor: '#F1F1F1',
  },
  activeDotStyle: {
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#404040',
  },
  dotContainerStyle: { gap: 5, marginBottom: 10 },
});
