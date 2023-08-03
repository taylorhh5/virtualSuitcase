import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      data-name="Layer 3"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      {...props}
    >
      <Path d="M28.781 104.122h70.438a2.111 2.111 0 002.111-2.111V52.188a2.11 2.11 0 00-.851-1.694L65.26 24.3a2.109 2.109 0 00-2.519 0L27.522 50.5a2.11 2.11 0 00-.851 1.694v49.822a2.111 2.111 0 002.11 2.106zM72.195 99.9H55.8V75.344h16.395zm-41.3-46.651L64 28.62l33.108 24.629V99.9H76.417V73.233a2.111 2.111 0 00-2.111-2.111H53.69a2.111 2.111 0 00-2.111 2.111V99.9H30.892z" strokeWidth={2} stroke={props.color} fill={props.color} />
    </Svg>
  )
}

export default SvgComponent
