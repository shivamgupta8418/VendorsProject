
export const fetchFunction=(url,data)=>{
    return fetch(url, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
     })
       .then((res) => res.json())
   }


   export const fetchFunctionAuth=(url,data)=>{
    return fetch(url, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "authorization" : `Bearer ${localStorage.getItem("token")}`
       },
       body: JSON.stringify(data),
     })
       .then((res) => res.json())
   }

  