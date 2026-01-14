import { MdOutlineCamera } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { LuChefHat } from "react-icons/lu";
import { Link } from "react-router-dom";

const QuickActions = () => {
  return (
     <div className="col-span-4 flex flex-col justify-evenly border-2 border-gray-200 rounded-3xl p-2 bg-white">
      <h1 className="m-2 p-1 font-bold text-xl">Quick Actions</h1>
            <div className="flex px-3 items-center text-4xl border border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-200/5 bg-[#f8f7f3] m-2 p-1 gap-2 cursor-pointer">
              <MdOutlineCamera className="text-green-400 p-1 bg-green-400/15 rounded-4xl"/>
              <div>
                <Link to="/calorie-check">
                <div className="text-lg"> Scan Food</div>
                <p className=" text-xs text-gray-600">Take a photo</p>
                </Link>
              </div>
            </div>
            <div className="flex px-3 items-center text-4xl border rounded-xl border-gray-200 hover:border-green-400 hover:bg-green-200/5 bg-[#f8f7f3] m-2 p-1 gap-2 cursor-pointer" >
              <LuChefHat className="text-orange-400 p-1 bg-orange-400/15 rounded-xl"/>
              <div>
                <Link to="/recipe">
                 <div className="text-lg"> Get Recipe</div>
                 <p className=" text-xs text-gray-600">From ingredients</p>
                </Link>
              </div>
            </div>
            <div className="flex px-3 items-center text-4xl border  border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-200/5 bg-[#f8f7f3] m-2 p-1 gap-2 cursor-pointer" >
              <GoPlus className="text-gray-400 p-1 bg-amber-400/15 rounded-xl"/>
              <div>
                <Link to="/add-meal">
                <div className="text-lg " >
                  {" "}
                  Log Manually
                </div>
                <p className=" text-xs text-gray-600">Add meal entry</p>
                </Link>

              </div>
            </div>
          </div>
  )
}

export default QuickActions