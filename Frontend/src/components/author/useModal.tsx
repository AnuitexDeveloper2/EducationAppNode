import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(
    {
      create: false,
      delete: false,
      createProduct:false
    }
  );

  function toggle(toggle) {
    switch (toggle) {
      case "createAuthor":
        setIsShowing({create:!isShowing.create,delete: false,createProduct:false});
        break;
      case "remove":
        setIsShowing({create: false,delete: !isShowing.delete,createProduct: false});
        break
      case "createProduct":
        setIsShowing({create: false,delete: false,createProduct: !isShowing.createProduct});
        break;
    }
  }

  return {
    isShowing,
    toggle,
  }
};

export default useModal;