import { useContext } from 'react';
import { UserContext } from '../../UserContext';
import "react-bootstrap"


const tepmEvents = [
    {
        "title" :"metting",
        "date":"sep 2 2022",
        "time" :"20:30 pm LT",
        "description" : "we will have a metting every one should present blah blah blah",
        "image" :"no for now",

    },
    {
        "title" :"metting",
        "date":"sep 2 2022",
        "time" :"20:30 pm LT",
        "description" : "we will have a metting every one should present blah blah blah",
        "image" :"no for now",
        
    },
    {
        "title" :"metting",
        "date":"sep 2 2022",
        "time" :"20:30 pm LT",
        "description" : "we will have a metting every one should present blah blah blah",
        "image" :"no for now",
        
    },
    {
        "title" :"metting",
        "date":"sep 2 2022",
        "time" :"20:30 pm LT",
        "description" : "we will have a metting every one should present blah blah blah",
        "image" :"no for now",
        
    },
]
function Event(){
    const { userData } = useContext(UserContext);
    return (
        <>

      {  tepmEvents.map(
            (evt) => {
                return (
                    <div id={evt.id} className="btn btn-primary">{evt.title}</div>
                )
            }
        )}
        
        </>
    )
}
export default Event;