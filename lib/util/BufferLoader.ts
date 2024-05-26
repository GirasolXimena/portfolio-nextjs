class BufferLoader {
  context: AudioContext;
  urlList: string[];
  onloadCallback: (bufferList: AudioBuffer[]) => void;
  bufferList: AudioBuffer[];
  loadCount: number;

  constructor(
    context: AudioContext,
    urlList: string[],
    onloadCallback: (bufferList: AudioBuffer[]) => void
  ) {
    this.context = context;
    this.urlList = urlList;
    this.onloadCallback = onloadCallback;
    this.bufferList = [];
    this.loadCount = 0;
  }

  loadBuffer(url: string, index: number) {
    const loader = this;
    const context = loader.context;
    if(!context) return;
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    

    request.onload = function (): void {
      const decodeSuccess = (buffer: AudioBuffer | null): void => {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onloadCallback(loader.bufferList);
      }

      const decodeFail = (error: DOMException): void => {
        console.error('decodeAudioData error', error);
      }

      context.decodeAudioData(
        request.response,
        decodeSuccess,
        decodeFail
      );
    }

    request.onerror = function (): void {
      alert('BufferLoader: XHR error');
    }

    request.send();
  }

  load(): void {
    for (let i = 0; i < this.urlList.length; ++i)
      this.loadBuffer(this.urlList[i], i);
  }
}

export default BufferLoader;