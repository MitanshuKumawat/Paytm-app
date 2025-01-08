// export const Appbar = () => {
//     return <div className="shadow h-14 flex justify-between">
//         <div className="flex flex-col justify-center h-full ml-4">
//             PayTM App
//         </div>
//         <div className="flex">
//             <div className="flex flex-col justify-center h-full mr-4">
//                 Hello
//             </div>
//             <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
//                 <div className="flex flex-col justify-center h-full text-xl">
//                     U
//                 </div>
//             </div>
//         </div>
//     </div>
// }

//-----------optional------------
import { useState , useEffect} from "react"
import axios from "axios";

export const Appbar = () => {
    const [user,setUser] = useState('');

    useEffect(()=>{
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/user/bulk');
                const username = localStorage.getItem('username');

                // Use .find to locate the user based on the username
                const foundUser = await response.data.user.find(u => u.username === username);
                if(foundUser)
                    setUser(foundUser)
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    },[])

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                {user ? user.firstName : 'Loading...'}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user?user.firstName[0]:'U'}    {/*When a React component mounts, it first renders the initial state */}
                </div>
            </div>
        </div>
    </div>
}