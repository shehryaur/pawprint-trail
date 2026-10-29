"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

const DenLockContext = createContext<(locked: boolean) => void>(() => {});

export function useDenLock() {
  return useContext(DenLockContext);
}

/** Shows the locked door as soon as the den is locked, even if a refresh is late. */
export function DenSwitch({
  open,
  openView,
  lockedView,
}: {
  open: boolean;
  openView: ReactNode;
  lockedView: ReactNode;
}) {
  const [forcedLock, setForcedLock] = useState(false);
  const wasOpen = useRef(open);

  useEffect(() => {
    if (open && !wasOpen.current) setForcedLock(false);
    wasOpen.current = open;
  }, [open]);

  return (
    <DenLockContext.Provider value={setForcedLock}>
      {!open || forcedLock ? lockedView : openView}
    </DenLockContext.Provider>
  );
}
