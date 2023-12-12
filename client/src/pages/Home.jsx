import React from "react";



export default function Home() {


  return (
    <> 
      <div className="p-3">
        <Card/>
      </div>
    </> 
  );
}

function Badge(status){
  /*For automatic color and text*/
  const status_Id = badge.status_Id
  let status_Color
  let status_Name = "Halted"
  
  switch(status_Id){
    case 0:
      status_Color = "bg-yellow-400";
      break;
    case 1:
      status_Color = "bg-red-400"
      break;
    case 2:
      status_Color = "bg-green-400"
    case 4:
      status_Color = "bg-gray-400"
  }

  return [status_Color,status_Name];

}

function Card(){
  

  return(
    <>
      <div class="max-w-sm rounded overflow-hidden shadow-lg border-2">
        <img class="max-w-sm" src="https://media.tenor.com/fajm0GvKOU4AAAAM/sus.gif" alt="Sunset in the mountains"/>
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">The Coldest Rock</div>
          <p class="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-yellow-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">WSTRZYMANY</span>
          <span class="inline-block bg-green-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">PILNE</span>
        </div>
      </div>
    </>
  )
}
