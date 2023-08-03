import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function PlusSignSVG (props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <G data-name="57-Add">
        <Path d="M16 0a16 16 0 1016 16A16 16 0 0016 0zm0 30a14 14 0 1114-14 14 14 0 01-14 14z" strokeWidth={0.6} stroke={props.color} fill={props.color} />
        <Path d="M17 15V6h-2v9H6v2h9v9h2v-9h9v-2h-9z" stroke={props.color} fill={props.color} />
      </G>
    </Svg>
  )
}

export default PlusSignSVG 