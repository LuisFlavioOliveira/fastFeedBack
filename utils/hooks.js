import React from 'react';

/* This is a custom hook to abort a fetch when component is unmounted */
function useAbortController() {
  const abortControllerRef = React.useRef(); // here we pass a ref to store the state of the abortControllerRef
  const getAbortController = React.useCallback(() => {
    if (!abortControllerRef.current) {
      abortControllerRef.current = new AbortController(); // here we create the abort controller API (https://developers.google.com/web/updates/2017/09/abortable-fetch) and set it to the ref
    }
    return abortControllerRef.current;
  }, []);

  React.useEffect(
    () => () => {
      console.log('Aborting fetch...');
      getAbortController().abort();
    }, // when the component is unmounted, run cleanup function and abort the fetch. The abort method will notify the {{signal}} and it'll abort the fetch
    [getAbortController]
  );

  const getSignal = React.useCallback(() => getAbortController().signal, [
    getAbortController,
  ]); // Here we get the {{signal}} that will be passed to the fetch function. Once the signal receives the notification from controller.abort, it'll abort the fetch

  return getSignal; // we then returned the created signal and we need to pass it to the fetch function
}

export { useAbortController };
