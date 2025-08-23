import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import Loading from './Loading';
import Error from './Error';

type Props = {
  title: string;
  isLoading?: boolean;
  error?: boolean;
  style?: StyleProp<ViewStyle>;
  refetch?: () => void;
  children: React.ReactNode;
};

export default function SectionWrapper({
  title,
  isLoading,
  error,
  style,
  refetch,
  children,
}: Props) {
  if (isLoading) return <Loading />;
  if (error)
    return <Error message={`Error loading ${title}`} onRefresh={refetch} />;
  return (
    <View testID="SectionWrapperContainer" style={style}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
