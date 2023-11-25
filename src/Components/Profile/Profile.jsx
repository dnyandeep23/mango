import React ,{useRef,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";



const Profile = ({setShowProfile , scrolled}) => {
    const navigate = useNavigate();
    const profileRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
          setShowProfile(false);
        }
      };
  
      const handleScroll = () => {
        if (scrolled) {
          console.log("called")
          // Update the ref position when scrolling
          if (profileRef.current) {
            const { top, bottom } = profileRef.current.getBoundingClientRect();
            if (bottom < 0 || top > window.innerHeight) {
              setShowProfile(false);
            }
          }
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("scroll", handleScroll);
      };
    }, [setShowProfile, scrolled]);


  return (
    <>
    <div className="z-50" ref={profileRef}>
      <ul className="absolute top-0 right-0 mt-12 ml-4 bg-gray-500  text-white rounded-lg">
        <li>
          <div  className="flex items-center justify-left gap-4 hover:bg-orange-500 py-2 px-8 rounded-b-lg" onClick={()=>{navigate('/profile')}}>
            <IoPersonCircle />
            My Profile
          </div>
        </li>
        <li>
          <div className="flex items-center justify-left gap-4 hover:bg-orange-500 py-2 px-8 rounded-b-lg" onClick={()=>{navigate('/order')}}>
            <MdShoppingCart />
            Order
          </div>
        </li>
        <li>
          <div className="flex items-center justify-left gap-4 hover:bg-orange-500 py-2 px-8 rounded-b-lg" onClick={()=>{navigate('/wishlist')}}>
            <AiFillHeart />
            Wishlist
          </div>
        </li>
        <li>
          <div className="flex items-center justify-left gap-4 hover:bg-orange-500 py-2 px-8 rounded-b-lg" onClick={()=>{navigate("/login")}}>
            <FaSignOutAlt />
            Login / SignUp
          </div>
        </li>
        <li>
          <div className="flex items-center justify-left gap-4 hover:bg-orange-500 py-2 px-8 rounded-b-lg">
            <FaSignOutAlt />
            Signout
          </div>
        </li>
      </ul>
    </div>
    </>
  );
};

export default Profile;

