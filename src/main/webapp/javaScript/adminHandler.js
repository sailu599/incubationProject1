/**
 * 
 */
window.onload=async function()//optimiseeeeeeeeeeee
     {
    	let mainDiv=document.getElementById('productDiv');
    	let response =await fetch('http://localhost:3000/Struts_rest/user/');
    	let json=await response.json();
    	json.forEach((data)=>{
    		
    		let row=document.createElement('tr');
    		
    		
    		let cell1=document.createElement('td');
    		let cell2=document.createElement('td');
    		let cell3=document.createElement('td');
    		let cell4=document.createElement('td');
    		let cell5=document.createElement('td');
    		
    		
    		cell1.innerText=data.userId;
    		cell2.innerText=data.userName;
    		cell3.innerText=data.email;
    		cell4.innerHTML = `<button onClick="showUpdateForm(${data.userId},'${data.userName}','${data.email}','${data.password}')">Update</button>`;
    		cell5.innerHTML = `<button onClick="deleteUser(${data.userId})">Delete</button>`;

    		
    		row.appendChild(cell1);
    		row.appendChild(cell2);
    		row.appendChild(cell3);
    		row.appendChild(cell4);
    		row.appendChild(cell5);
    		mainDiv.appendChild(row);
    	})
     }
     
      function showAddUserForm()
      {
    	  document.getElementById("addDiv").style.display="block";
    	  
      }
      
   
     function showUpdateForm(id,name,email,password)
     {
   
    	document.getElementById("userName").value=name;
    	document.getElementById("userId").value=id;
    	document.getElementById("email").value=email;
    	document.getElementById("password").value=password;
    	document.getElementById("updateDiv").style.display="block";
       	
     }