import React, { useState, useEffect, useRef } from 'react';
import { MdClose } from 'react-icons/md';
import useFetch from '../../hook/useFetch';
import { useNavigate } from 'react-router-dom';

const Search = ({ setShowSearch }) => {
  const [query, setQuery] = useState("");
  const [hide, setHide] = useState(false);
  const [focus, setFocus] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowSearch]);
  
  // useEffect(() => {
  //   if(showSearch){
  //     const handleClickOutside = (event) => {
  //       if (searchRef.current && !searchRef.current.contains(event.target)) {
  //         setShowSearch(false);
  //       }
  //     };
  
  //     document.addEventListener("click", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("click", handleClickOutside);
  //     };
  //   }
    
  // }, [setShowSearch]);


  const onChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query.length === 0) {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [query]);

  // const onBlur = () => {
  //   setShowSearch(false);
  // };


  const { data } = useFetch(
    `/api/products?populate=*&filters[title][$contains]=${query}`
  );

  return (
    <>
      <div ref={searchRef} className='h-full w-full bg-[rgba(0,0,0,0.6)] z-50 space-y-4'>
        <div  className='absolute top-0 right-6 md:right-[275px] lg:right-[260px] mt-12 p-2 z-50 bg-zinc-600 w-[85%] md:w-3/12 h-14 rounded-lg'>
          <div className='flex items-center'>
            <input
              type='search'
              name=''
              id=''
              value={query}
              onChange={onChange}
              className='w-full bg-slate-700 py-2 px-3 text-orange-500 outline-yellow-600 rounded-lg'
            />
            <MdClose
              size={35}
              className='text-white mx-2'
              onClick={() => {
                setShowSearch(false);
              }}
            />
          </div>
          <div
            className={`search-result-content bg-zinc-600 ${
              hide ? 'hidden' : 'visible'
            } w-full p-4 mt-4 rounded-xl`}
          >
            <div className='search-results h-1/6 '>
              {data?.data?.length > 0 ? (
                data?.data?.map((item) => (
                  <div
                    key={item.id}
                    className='search-result-item flex items-center gap-2 bg-slate-100 rounded-xl mt-4'
                    onClick={() => {
                      navigate(`/product/${item.id}`);
                      setShowSearch(false);
                    }}
                  >
                    <div className='img-container w-16 h-16 bg-[rgba(0,0,0,0.05)] flex-shrink object-center'>
                      <img
                        src={process.env.REACT_APP_DEV_URL + item.attributes.img.data[0].attributes.url}
                        className='w-full h-full'
                        alt=''
                      />
                    </div>
                    <div className='product-details overflow-hidden relative'>
                      <span className='name text-ellipsis whitespace-nowrap overflow-hidden block text-base font-semibold text-[rgba(0,0,0,0.7)] w-52'>
                        {item.attributes.title}
                      </span>
                      <span className='desc text-ellipsis whitespace-nowrap overflow-hidden block text-sm font-normal text-[rgba(0,0,0,0.5)] w-48 md:w-64'>
                        {item.attributes.desc}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-white'>No items found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
