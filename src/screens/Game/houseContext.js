import React, {useContext} from 'react';

export const HouseContext = React.createContext(123);

export const useHouseContext = () => {
    const houseContext = useContext(HouseContext);
    return houseContext;
}