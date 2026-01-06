const Contact = () => {
 
  return (
    <div className=" flex justify-center">
      <div className="pt-[50px] md:pt-[200px] w-7xl">
        <div className="flex justify-center md:justify-between w-full">
          <div>
            <div className="flex items-center gap-2">
              <div className="text-4xl font-bold">Contact Now!</div>
              <img className="h-[80px]" src="https://imgs.search.brave.com/J5H98ePXy0ZUEEeR5HcWDKUc3z5K39L4J8CsoXRlQ94/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/aWNvbnM4LmNvbS9E/dXNrX1dpcmVkLzEy/MDAvZW1wbG95ZWUt/Y2FyZC5qcGc" alt="" />
            </div>
            <div className="text-2xl p-3 border my-16 rounded">
              <h1>Name </h1>
              <div className="font-bold mb-2"> Sajjan Kumar</div>
              <h1>Gmail </h1>
              <div className="font-bold mb-2"> sajjannnn@gmail.com</div>

              <h1>Mobile No </h1>
              <div className="font-bold mb-2"> 9024208888</div>
            </div>
          </div>

          <img className="hidden md:block h-[600px]" src="https://cdn.prod.website-files.com/66461a94463c3d84ded09b1a/665de686839941a0eb10a7b1_original-4198d65f20450e37d170b009d242e06d-removebg-preview.webp" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
