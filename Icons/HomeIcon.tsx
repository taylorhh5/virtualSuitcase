import * as React from 'react';
// import {View, StyleSheet} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';

/* SVGR has dropped some elements not supported by react-native-svg: title */

const HomeIcon = ({width, height, color}) => {
  return (
    <Svg
      width={width || '100%'}
      height={height || '100%'}
      viewBox="0 0 22 20"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M10.652 1.171a.633.633 0 01.87.004h0l9.275 8.805a.656.656 0 01.03.918.633.633 0 01-.904.03h0l-1.162-1.103v8.526a.646.646 0 01-.545.642l-.094.007h-4.798a.644.644 0 01-.64-.649h0v-4.089h-3.22v4.089c0 .358-.285.649-.639.649h0H4.05a.644.644 0 01-.64-.65h0V9.687l-1.337 1.246a.634.634 0 01-.34.165l-.092.006a.633.633 0 01-.471-.21.656.656 0 01.038-.917h0zm.43 1.363L4.687 8.493v9.209h3.498v-4.089c0-.359.286-.65.64-.65h4.498c.353 0 .64.291.64.65h0v4.089h3.518L17.48 8.61l-6.4-6.076z"
        fill={color || '#989EAC'}
        fillRule="nonzero"
        stroke={color || '#989EAC'}
      />
    </Svg>
  );
};

export default HomeIcon;
