import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import Loading from './Loading';

type Props = {
  title: string;
  isLoading?: boolean;
  error?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function SectionWrapper({
  title,
  isLoading,
  error,
  children,
  style,
}: Props) {
  if (isLoading) return <Loading />;
  if (error) return <Text>Error loading {title}</Text>;
  return (
    <View testID='SectionWrapperContainer' style={style}>
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
