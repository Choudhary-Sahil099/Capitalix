import {useState} from 'react'

const ExploreBox = () => {
    const options = ["Community", "Hot", "New" , "Following"];
    const [current , setCurrent] = useState("Community");
  return (
    <div className='bg-[#0e0d0d] w-322 h-168 rounded-xl overflow-y-auto p-6'>
      <div className='flex justify-center items-center gap-9'>
        {options.map((items) => (
            <button key={items} 
            onClick={() =>setCurrent(items)}
            className={`flex items-center gap-2 px-3 py-1 text-xs rounded-lg transition-all
                    ${
                      current === items
                        ? "bg-indigo-500 text-white"
                        : "text-[#a8a8a8] hover:bg-[#222]"
                    }`}>{items}</button>
        ))};
      </div>
      <div>

      </div>
    </div>
  )
}

export default ExploreBox
