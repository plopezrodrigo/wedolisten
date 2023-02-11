import { useState } from 'react';

export const useModal = (modoInicial = false) => {
    const [isOpered, setIsOpened] = useState(modoInicial);
    const toggle = () => setIsOpened(!setIsOpened);

    return [setIsOpened, setIsOpened, toggle];
};