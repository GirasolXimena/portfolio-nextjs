'use client';
import { useEffect, useRef } from 'react';
import utilities from 'lib/util';
import { useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';

const { setCustomProperties, toCartesianCoords } = utilities;

export const useMouseInput = () => {
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);
  const motionXRef = useRef(motionX);
  const motionYRef = useRef(motionY);
  
  useEffect(() => {
    motionXRef.current = motionX;
    motionYRef.current = motionY;
  }, [motionX, motionY]);

  useEffect(() => {
    const { body } = document;
    const handlePointerMove = ({clientX, clientY}: PointerEvent) => {
      motionXRef.current.set(clientX);
      motionYRef.current.set(clientY);
    }
    body.addEventListener('pointermove', handlePointerMove);

    return () => {
      body.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  const cartesianX = useTransform(motionX, (x) => toCartesianCoords({ x, y: 0 }).x);
  const cartesianY = useTransform(motionY, (y) => toCartesianCoords({ x: 0, y }).y);
  useMotionValueEvent(cartesianX, 'change', (x) => setCustomProperties({ 'mouse-x': String(x) }));
  useMotionValueEvent(cartesianY, 'change', (y) => setCustomProperties({ 'mouse-y': String(y) }));
};
