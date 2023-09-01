'use client';
import utilities from 'lib/util';
import { useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import { useEventListener, useIsClient } from 'usehooks-ts';
import { useMediaQuery } from 'usehooks-ts';

const { setCustomProperties, toCartesianCoords } = utilities;

export const useMouseInput = () => {
  const isBrowser = useIsClient();
  const hasMouse = useMediaQuery('(hover: hover)');

  // Always create the motion values.
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);

  const handlePointerMove = ({ clientX, clientY }: PointerEvent) => {
    if (!isBrowser || !hasMouse) return;
    
    motionY.set(clientY);
    motionX.set(clientX);
  };

  // Always add the event listener, but it won't do anything if not in the browser.
  useEventListener('pointermove', handlePointerMove);

  const cartesianX = useTransform(motionX, (x) => toCartesianCoords({ x }).x);
  const cartesianY = useTransform(motionY, (y) => toCartesianCoords({ y }).y);

  // Always add the motion value events.
  useMotionValueEvent(cartesianX, 'change', (x) => {
    if (isBrowser) setCustomProperties({ 'mouse-x': String(x) });
  });
  useMotionValueEvent(cartesianY, 'change', (y) => {
    if (isBrowser) setCustomProperties({ 'mouse-y': String(y) });
  });
};
