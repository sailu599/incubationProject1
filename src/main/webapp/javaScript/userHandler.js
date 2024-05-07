 
       
      function addUser(role)
      {
    	let form = document.getElementById('addUserForm');
  	    let formData = new FormData(form);
  	    let queryParams = new URLSearchParams(formData);
  	    let url = 'http://localhost:3000/Struts_rest/user/add?' + queryParams.toString()+'&role='+role;
  	    fetch(url,{method:'POST'})
        .then(response=>{
			if(response.ok)
			{
			   alert("successfully added");
			   if(role==2)
        		window.location.reload();
        	else
		        {
					alert("working");
		          window.location.href="../index.html";
		        }
		 }
			 else 
			    alert("error in adding");
		})
		 .catch(error=>{
			alert("try again later")
		 })
        
      }
    
     
     async function updateUser() {
    	 
    	    
    	 
    	    let form = document.getElementById('updateUserForm');
    	    
 
    	    let formData = new FormData(form);
    	    
    	  
    	    let queryParams = new URLSearchParams(formData);
    	    
    	    let url = 'http://localhost:3000/Struts_rest/user/update?' + queryParams.toString()+"&role=2";
    	    fetch(url,{method:'POST'});
            alert("successfully updated");
    	}

     async function deleteUser(userId)
     {
    	 let userConfirm=confirm("Are you Sure Do yo want to delete the Manager? ");
    	 if(userConfirm)
    	  {
    		 let url="http://localhost:3000/Struts_rest/user/delete?userId="+userId;
    		let response=await fetch(url);
    		if(response.status==200)
    			{
    			    alert("The Manager has deleted successfully");
    			    window.location.reload();
    			}
    		else
    			{
    			  alert("error in deleting an item");
    			}
    	   }
     }
     
     