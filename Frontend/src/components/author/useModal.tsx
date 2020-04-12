import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(
    {
      create: false,
      open: false
    }
  );

  function toggle(toggle) {
    if (toggle=="edit") {
      setIsShowing({
        create:!isShowing.create,
        open: false
      });
    }

    if (toggle=="remove") {
      setIsShowing({
        create: false,
        open: !isShowing.open
      });
    }

    
  }

  return {
    isShowing,
    toggle,
  }
};

export default useModal;