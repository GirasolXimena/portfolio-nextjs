'use client';
import utilities from 'lib/util';
import { useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import { useEventListener } from 'usehooks-ts';

const { setCustomProperties, toCartesianCoords } = utilities;

export const useMouseInput = () => {
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);

  const handlePointerMove = ({clientX, clientY}: PointerEvent) => {
    motionY.set(clientY);
    motionX.set(clientX);
  }
  useEventListener('pointermove', handlePointerMove)


  const cartesianX = useTransform(motionX, (x) => toCartesianCoords({ x }).x);
  const cartesianY = useTransform(motionY, (y) => toCartesianCoords({ y }).y);
  useMotionValueEvent(cartesianX, 'change', (x) => setCustomProperties({ 'mouse-x': String(x) }));
  useMotionValueEvent(cartesianY, 'change', (y) => setCustomProperties({ 'mouse-y': String(y) }));
};
