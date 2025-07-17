import React from 'react'
import NavBar from '../components/NavBar'
import MainLeft from '../components/MainLeft'
import MainRight from '../components/MainRight'
import FlashMessage from '../components/FlashMessage'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const AdminPanel = () => {

     const location = useLocation();
    const navigate = useNavigate();
    const [flashMessage, setFlashMessage] = useState(null);
    const [reloadTrigger, setReloadTrigger] = useState(false);
  
    useEffect(() => {
      if (location.state?.message) {
        setFlashMessage(location.state.message);

        setReloadTrigger(prev => !prev);
  
        // 👇 Clear the state after using it
        // This replaces the current history entry without the message
        navigate(location.pathname, { replace: true });
      }
    }, [location, navigate]);

  return (
     <div className="relative">
      <FlashMessage message={flashMessage} />
    
        <div className="flex flex-col h-screen w-screen overflow-hidden">
            {/* Top Navbar */}
            <div className="h-[10vh] border-b border-black">
                <NavBar isAdmin/>
            </div>

            {/* Bottom: Left and Right Pane */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar */}
                <div className="w-[20%] overflow-hidden">
                <MainLeft isAdmin />
                </div>

                {/* Right Main Content */}
                <div className="w-[80%] overflow-hidden">
                <MainRight  isAdmin reloadTrigger={reloadTrigger} />
                </div>
            </div>
        </div>
    </div>
    )
}

export default AdminPanel