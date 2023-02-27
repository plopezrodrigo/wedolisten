import { useState } from 'react';

export const useModal = (modoInicial = false) => {
    const [isOpened, setIsOpened] = useState(modoInicial);
    
    const toggle = () => {setIsOpened(!isOpened);}

    return [isOpened, setIsOpened, toggle];
};