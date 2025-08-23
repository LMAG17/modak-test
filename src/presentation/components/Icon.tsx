import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

const AntDesignIcon = AntDesign as unknown as React.FC<{
  name: string;
  size?: number;
  color?: string;
  style?: object;
}>;
const EntypoIcon = Entypo as unknown as React.FC<{
  name: string;
  size?: number;
  color?: string;
  style?: object;
}>;
const EvilIconsIcon = EvilIcons as unknown as React.FC<{
  name: string;
  size?: number;
  color?: string;
  style?: object;
}>;
const FeatherIcon = Feather as unknown as React.FC<{
  name: string;
  size?: number;
  color?: string;
  style?: object;
}>;
const FontAwesomeIcon = FontAwesome as unknown as React.FC<{
  name: string;
  size?: number;
  color?: string;
  style?: object;
}>;
const FontAwesome5Icon = FontAwesome5 as unknown as React.FC<{
  name: string;
  size?: number;
  color?: string;
  style?: object;
}>;
const FoundationIcon = Foundation as unknown as React.FC<{
  name: string;
  size?: number;
  color?: string;
  style?: object;
}>;
const IoniconsIcon = Ionicons as unknown as React.FC<{
  name: string;
  size?: number;
  color?: string;
  style?: object;
}>;
const MaterialIconsIcon = MaterialIcons as unknown as React.FC<{
  name: string;
  size?: number;
  color?: string;
  style?: object;
}>;
const MaterialCommunityIconsIcon =
  MaterialCommunityIcons as unknown as React.FC<{
    name: string;
    size?: number;
    color?: string;
    style?: object;
  }>;
const OcticonsIcon = Octicons as unknown as React.FC<{
  name: string;
  size?: number;
  color?: string;
  style?: object;
}>;
const SimpleLineIconsIcon = SimpleLineIcons as unknown as React.FC<{
  name: string;
  size?: number;
  color?: string;
  style?: object;
}>;
const ZocialIcon = Zocial as unknown as React.FC<{
  name: string;
  size?: number;
  color?: string;
  style?: object;
}>;

export type IconFamily =
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialIcons'
  | 'MaterialCommunityIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';

interface IconProps {
  testID?: string;
  family: IconFamily;
  name: string;
  size?: number;
  color?: string;
  style?: object;
}

const Icon: React.FC<IconProps> = ({
  family,
  name,
  size = 24,
  color = '#404040',
  style,
}) => {
  switch (family) {
    case 'AntDesign':
      return (
        <AntDesignIcon name={name} size={size} color={color} style={style} />
      );
    case 'Entypo':
      return <EntypoIcon name={name} size={size} color={color} style={style} />;
    case 'EvilIcons':
      return (
        <EvilIconsIcon name={name} size={size} color={color} style={style} />
      );
    case 'Feather':
      return (
        <FeatherIcon name={name} size={size} color={color} style={style} />
      );
    case 'FontAwesome':
      return (
        <FontAwesomeIcon name={name} size={size} color={color} style={style} />
      );
    case 'FontAwesome5':
      return (
        <FontAwesome5Icon name={name} size={size} color={color} style={style} />
      );
    case 'Foundation':
      return (
        <FoundationIcon name={name} size={size} color={color} style={style} />
      );
    case 'Ionicons':
      return (
        <IoniconsIcon name={name} size={size} color={color} style={style} />
      );
    case 'MaterialIcons':
      return (
        <MaterialIconsIcon
          name={name}
          size={size}
          color={color}
          style={style}
        />
      );
    case 'MaterialCommunityIcons':
      return (
        <MaterialCommunityIconsIcon
          name={name}
          size={size}
          color={color}
          style={style}
        />
      );
    case 'Octicons':
      return (
        <OcticonsIcon name={name} size={size} color={color} style={style} />
      );
    case 'SimpleLineIcons':
      return (
        <SimpleLineIconsIcon
          name={name}
          size={size}
          color={color}
          style={style}
        />
      );
    case 'Zocial':
      return <ZocialIcon name={name} size={size} color={color} style={style} />;
    default:
      return null;
  }
};

export default Icon;
