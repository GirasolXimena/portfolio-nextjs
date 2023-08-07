import { useState } from "react";
import styles from "../styles/mute-icon.module.scss"
function SoundIcon({ size, playing }) {
  const [preventAnimation, setPreventAnimation] = useState<boolean>(false);
  return (
    <svg onMouseLeave={() => setPreventAnimation(false)} onClick={() => setPreventAnimation(true)} className={`${styles.soundIcon} ${!preventAnimation && styles.animate} ${playing && styles.playing}`} width={size} height={size} viewBox="0 0 116 115" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <g id="mute-icon" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path d="M91.3530067,62.0022272 C91.4510027,62.1269494 91.5,62.2650327 91.5,62.4164811 C91.5,62.5590208 91.4510027,62.6926497 91.3530067,62.8173719 L87.3173719,66.8530067 C87.1926497,66.9510027 87.0590208,67 86.9164811,67 C86.7650327,67 86.6269494,66.9510027 86.5022272,66.8530067 L79.5,59.8507795 L72.4977728,66.8530067 C72.3730506,66.9510027 72.2349673,67 72.0835189,67 C71.9409792,67 71.8073503,66.9510027 71.6826281,66.8530067 L67.6469933,62.8173719 C67.5489973,62.6926497 67.5,62.5590208 67.5,62.4164811 C67.5,62.2650327 67.5489973,62.1269494 67.6469933,62.0022272 L74.6492205,55 L67.6469933,47.9977728 C67.5489973,47.8730506 67.5,47.7349673 67.5,47.5835189 C67.5,47.4409792 67.5489973,47.3073503 67.6469933,47.1826281 L71.6826281,43.1469933 C71.8073503,43.0489973 71.9409792,43 72.0835189,43 C72.2349673,43 72.3730506,43.0489973 72.4977728,43.1469933 L79.5,50.1492205 L86.5022272,43.1469933 C86.6269494,43.0489973 86.7650327,43 86.9164811,43 C87.0590208,43 87.1926497,43.0489973 87.3173719,43.1469933 L91.3530067,47.1826281 C91.4510027,47.3073503 91.5,47.4409792 91.5,47.5835189 C91.5,47.7349673 91.4510027,47.8730506 91.3530067,47.9977728 L84.3507795,55 L91.3530067,62.0022272 Z" id="mute" fill="none" className={styles.mute}></path>


        <path d="M60.4793583,26.5069648 L60.4793583,83.4930352 C60.4793583,84.1722807 60.1748735,84.6407189 59.5658947,84.8983637 C58.863227,85.109164 58.3128122,84.9920545 57.9146338,84.5470316 L41.8236225,66.8802553 L30.5107281,66.8802553 C30.0891275,66.8802553 29.7319434,66.7338684 29.4391652,66.4410901 C29.1463869,66.1483119 29,65.7911278 29,65.3695272 L29,44.6069938 C29,44.1853931 29.1463869,43.8282091 29.4391652,43.5354308 C29.7319434,43.2426526 30.0891275,43.0962657 30.5107281,43.0962657 L41.8236225,43.0962657 L57.9146338,25.4529684 C58.3128122,25.0079455 58.863227,24.890836 59.5658947,25.1016363 C60.1748735,25.3592811 60.4793583,25.8277193 60.4793583,26.5069648 Z" id="speaker" className={styles.speaker} fill="#FFFFFF"></path>


        <g id="decibels" className={styles.decibels} transform="translate(68.000000, 31.000000)" fill="#FFFFFF" fillRule="nonzero">
          <path d="M0.702485289,12.786522 C-0.121910657,13.7231906 -0.111975233,15.1599378 0.679254571,16.0979759 L0.860743073,16.2909868 C2.645082,18.0255236 3.61847753,20.4232332 3.56033255,23.0272401 C3.56019287,25.7437242 2.50035455,28.4785801 0.639076083,30.6047114 C-0.263950171,31.6307159 -0.214029031,33.2165066 0.814600661,34.123011 C1.29811049,34.5426804 1.86009666,34.7811406 2.4278127,34.7811406 C3.1222022,34.7811406 3.76523409,34.4909281 4.22751377,33.9292169 C6.915039,30.9309486 8.41296184,27.0307117 8.41296184,23.0397539 C8.41296184,18.9557157 6.8950911,15.2433343 4.11761631,12.6196727 C3.20910535,11.7522952 1.80122251,11.7634816 0.889823025,12.5956542 L0.702485289,12.786522 Z" id="one" className={styles.one}></path>
          <path d="M8.67098403,6.80096877 C7.78770266,7.80454221 7.86219964,9.38218554 8.82924181,10.3054335 C16.362652,17.6453617 16.2687065,30.6391418 8.54683449,39.3780967 C7.66283373,40.3824858 7.73733072,41.9601291 8.70437288,42.8833772 C9.20417475,43.3179917 9.76616093,43.5564521 10.333877,43.5564521 C11.0282665,43.5564521 11.6712984,43.2662396 12.133578,42.7045282 C21.6154689,31.9679805 21.6154689,15.7596565 12.0888602,6.63673036 C11.1777871,5.76691593 9.76973344,5.77793992 8.85832258,6.61010171 L8.67098403,6.80096877 Z" id="two" opacity="1" className={styles.two}></path>
          <path className={styles.three} d="M18.5819868,0.815770621 C17.6987055,1.81934407 17.7732025,3.39698738 18.7402446,4.3202354 C28.8117509,13.9833184 28.6982807,31.1981896 18.4572998,42.8222539 C17.5738365,43.8260339 17.6483335,45.4036772 18.6153757,46.3269251 C19.1151776,46.7615398 19.6771637,47 20.2448798,47 C20.9392693,47 21.5823012,46.7097875 22.0445809,46.1480763 C33.9827093,32.5906017 34.0023847,12.1601049 22.0001179,0.65177648 C21.0888069,-0.218265933 19.6807374,-0.20725714 18.7693255,0.624903632 L18.5819868,0.815770621 Z" id="three"></path>
        </g>
      </g>
    </svg>
  )
}

export default SoundIcon;