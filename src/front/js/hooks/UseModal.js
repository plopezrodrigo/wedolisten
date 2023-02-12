import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useModal = (modoInicial = false) => {
    const [isOpened, setIsOpened] = useState(modoInicial);
    const navigate = useNavigate();
    
    const toggle = () => {setIsOpened(!isOpened);}

    return [isOpened, setIsOpened, toggle];
};