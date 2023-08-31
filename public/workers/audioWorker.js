self.onmessage = (event) => {
    const { type, data } = event.data;

    switch (type) {
        case 'INIT_ANALYSER':
            // Initialize the audio context and analyser node here.
            break;
        case 'GET_AUDIO_DATA':
            const dataArray = new Float32Array(data);

            let sumSquares = 0.0;
            for (const amplitude of dataArray) {
                sumSquares += amplitude * amplitude;
            }

            const rms = Math.sqrt(sumSquares / dataArray.length);

            // Send the computed RMS back to the main thread.
            self.postMessage({
                type: 'AUDIO_RMS_DATA',
                rms
            });
            break;
    }
};
