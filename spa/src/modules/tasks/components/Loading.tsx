export const Loading = () => (
  <div className="w-screen h-screen absolute left-0 top-0 flex items-center justify-center bg-black/90 ">
    <div className="inline-flex gap-x-1 items-center">
      <span className="w-2 h-2 bg-white rounded-full animate-blink [animation-delay:0s]"></span>
      <span className="w-2 h-2 bg-white rounded-full animate-blink [animation-delay:0.2s]"></span>
      <span className="w-2 h-2 bg-white rounded-full animate-blink [animation-delay:0.4s]"></span>
    </div>
  </div>
); 