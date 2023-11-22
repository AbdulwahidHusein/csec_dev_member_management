import { useContext } from 'react';
import { UserContext } from '../../UserContext';

function Community (){
    const { userData } = useContext(UserContext);
    console.log(userData)
    console.log("community page")
    return (
        <>
        community page
        </>
    )
}

export default Community;