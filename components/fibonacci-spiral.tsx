import React, { useState, useEffect } from 'react';

const φ = 1.618033988749894848;

const GoldenSpiralSimple = ({ initialSize = 400, canvasWidth = 400, canvasHeight = 400 }) => {
    const [elements, setElements] = useState([]);

    useEffect(() => {
        const drawSpiral = (x, y, size, direction, acc = [] as any) => {
            if (size <= 30) return acc;

            // Rectangle
            acc.push(<rect key={`rect-${x}-${y}`} 
                          x={x} 
                          y={y} 
                          width={size} 
                          height={size} 
                          fill="none" 
                          stroke="#8E8265" 
                          strokeWidth="1" />);

            switch (direction) {
                case "left":
                    // Arc
                    acc.push(<path key={`arc-${x}-${y}`} 
                                  d={`M ${x} ${y} A ${size} ${size} 0 0 1 ${x} ${y + size}`} 
                                  fill="none" 
                                  stroke="#8E8265" 
                                  strokeWidth="2" />);
                    // Recursion
                    drawSpiral(x - size/φ, y, size / φ, "top", acc);
                    break;
                case "top":
                    // Arc
                    acc.push(<path key={`arc-${x}-${y}`} 
                                  d={`M ${x} ${y} A ${size} ${size} 0 0 1 ${x + size} ${y}`} 
                                  fill="none" 
                                  stroke="#8E8265" 
                                  strokeWidth="2" />);
                    // Recursion
                    drawSpiral(x, y - size/φ, size / φ, "right", acc);
                    break;
                case "right":
                    // Arc
                    acc.push(<path key={`arc-${x}-${y}`} 
                                  d={`M ${x + size} ${y + size} A ${size} ${size} 0 0 1 ${x + size} ${y}`} 
                                  fill="none" 
                                  stroke="#8E8265" 
                                  strokeWidth="2" />);
                    // Recursion
                    drawSpiral(x + size - size/φ, y + size - size/φ, size / φ, "bottom", acc);
                    break;
                default:
                    // "bottom"
                    // Arc
                    acc.push(<path key={`arc-${x}-${y}`} 
                                  d={`M ${x} ${y + size} A ${size} ${size} 0 0 0 ${x + size} ${y + size}`} 
                                  fill="none" 
                                  stroke="#8E8265" 
                                  strokeWidth="2" />);
                    // Recursion
                    drawSpiral(x, y + size, size / φ, "left", acc);
                    break;
            }

            return acc;
        }

        setElements(drawSpiral(canvasWidth/2 - 1.618*initialSize, canvasHeight/2, initialSize, "bottom"));
    }, [initialSize, canvasWidth, canvasHeight]);

    return (
        <svg width={canvasWidth} height={canvasHeight}>
            {elements}
        </svg>
    );
}

export default GoldenSpiralSimple;
