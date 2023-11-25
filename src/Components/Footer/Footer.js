import "./Footer.css"
import {BsFacebook ,BsInstagram, BsPinterest} from "react-icons/bs";
import {FiTwitter} from "react-icons/fi";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 lg:w-1/4 mb-4 md:mb-0">
              <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
              <ul className="text-gray-400">
                <li className="mb-2">unkown ka Mango</li>
                <li className="mb-2">City, State ZIP</li>
                <li className="mb-2">Phone: +91 72087 54076</li>
                <li>Email: Jessica6900@GPM.com</li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 mb-4 md:mb-0">
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="text-gray-400">
                <li className="mb-2"><a href="#">Home</a></li>
                <li className="mb-2"><a href="#">About Us</a></li>
                <li className="mb-2"><a href="#">Products</a></li>
                <li><a href="https://wa.me/917208754076">Contact</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 mb-4 md:mb-0">
              <h4 className="text-lg font-semibold text-white mb-4">Social Media</h4>
              <ul className="text-gray-400">
                <li className="mb-2 hover:text-blue-600"><a href="" className="flex items-center gap-2"> <BsFacebook/> Facebook</a></li>
                <li className="mb-2 hover:text-sky-600"><a href="" className="flex items-center gap-2"><FiTwitter/> Twitter</a></li>
                <li className="mb-2 hover:text-pink-600"><a href="https://www.instagram.com/justin_fds05/" className="flex items-center gap-2"><BsInstagram/> Instagram</a></li>
                <li className="mb-2 hover:text-red-600"><a href="" className="flex items-center gap-2"><BsPinterest/> Pinterest</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4">
              <h4 className="text-lg font-semibold text-white mb-4">Subscribe to Our Newsletter</h4>
              <form className="mb-4">
                <div className="flex items-center">
                  <input type="email" className="w-full bg-gray-800 rounded py-2 px-3 text-gray-200" placeholder="Enter your email" />
                  <button className="ml-2 bg-yellow-500 hover:bg-yellow-600 hover:font-semibold rounded text-gray-900  py-2 px-4">Subscribe</button>
                </div>
              </form>
              <p className="text-gray-400 text-sm">Stay up to date with the latest news and promotions.</p>
            </div>
          </div>
          <hr className="border-t border-gray-700 my-8" />
          <div className="text-center text-gray-400 text-sm">
            &copy; 2023 Jessica Mango Website. All rights reserved.
          </div>
        </div>
      </footer>

    </>
  );
}
export default Footer;