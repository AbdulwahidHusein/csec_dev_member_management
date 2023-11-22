import { useContext } from 'react';
import { UserContext } from '../../UserContext';

function Team(){
    const { userData } = useContext(UserContext);
    return (
        <>
        Team page
        </>
    )
}

export default Team;