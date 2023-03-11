import { DependencyList, EffectCallback, useEffect, useRef } from "react";

const useComponentUpdate = (callback: EffectCallback, deps: DependencyList) => {
  const didMount = useRef(true);

  useEffect(() => {
    if (didMount.current) {
      didMount.current = false;
      return;
    }

    const cleanup = callback();

    if (cleanup) {
      return cleanup;
    }
  }, [...deps]);
};

export default useComponentUpdate;
