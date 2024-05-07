window.onload=async function()
     {
		
		
    	let mainDiv=document.getElementById('productDiv');
    	let response =await fetch('http://localhost:3000/Struts_rest/inventory/get?role='+sessionStorage.getItem('role'));
    	let json=await response.json();
        let buttonHolder=document.getElementById('buttonHolder');
        let button=document.createElement('button');
        let role=sessionStorage.getItem('role');
        
        
        if(role==1)
        {
			let invRow=document.getElementById('inventoryRow');
			let col1=document.createElement("th");
		    col1.textContent="CREATED BY";	
		    let col2=document.createElement("th");
		    col2.textContent="UPDATED BY";	
		    invRow.append(col1);invRow.append(col2);
		}
    	if(role!=3)
    	{
			button.textContent="Add Product";
			button.onclick=showAddProductForm;
			buttonHolder.appendChild(button);
			document.getElementById('home').href="../Home/adminHome.html";
		}
		else
		{
			button.textContent="View Cart";
			button.onclick=showCartPage;
			buttonHolder.appendChild(button);
		document.getElementById('home').href="../Home/customerHome.html";
			
		}
    	json.forEach((data)=>{
    		
    		let row=document.createElement('tr');
    		
    		
    		let cell1=document.createElement('td');
    		let cell2=document.createElement('td');
    		let cell3=document.createElement('td');
    		let cell4=document.createElement('td');
    		
    		cell1.innerText=data.productName;
    		cell2.innerText=data.price;
    		cell3.innerText=data.quantity;
    		if(data.quantity==0)
    		    row.style.backgroundColor="red";
    		
    		row.appendChild(cell1);
    		row.appendChild(cell2);
    		row.appendChild(cell3);
    		
    		
    		if(role!=3)
    		{
    		
    	
    		if(role==1)
    		{
				let cell6=document.createElement('td');
    		    let cell7=document.createElement('td');
    		    cell6.innerText=data.creatorName;
    		    cell7.innerText=data.editedName;
    		    if(data.editedName==undefined)
    		    {
					cell7.innerText="nill";
				}
    		    row.append(cell6);
    		    row.append(cell7);
			}
			let cell5=document.createElement('td');
    		cell4.innerHTML = `<button onClick="showUpdateForm(${data.productId},'${data.productName}',${data.price},${data.quantity})">Update</button>`;
    		cell5.innerHTML = `<button onClick="deleteProduct(${data.productId})">Delete</button>`;
    		row.appendChild(cell4);
    		row.appendChild(cell5);
    		}
    		else
    		{
				cell4.innerHTML=`<button onclick="addToCart(${data.productId})">Add to cart</button>`;
				row.appendChild(cell4);
			}
			
			
    		mainDiv.appendChild(row);
    	})
     }
     
      function showAddProductForm()
      {
    	  document.getElementById("addDiv").style.display="block";
    	  
      }
      
      
      function addProduct()
      {
    	let form = document.getElementById('addProductForm');
  	    let formData = new FormData(form);
  	    let queryParams = new URLSearchParams(formData);
  	    queryParams.append("createdBy", sessionStorage.getItem("userId"));
  	    let url = 'http://localhost:3000/Struts_rest/inventory/add?' + queryParams.toString();
  	    fetch(url)
  	    .then(response=>
  	    {
			if(response.ok)
			  alert("successfully Added");
			 else 
			  alert("Something went wrong");
		})
		.catch(error=>{
			alert(error);
			console.log(error);
		});
           	document.getElementById("addDiv").style.display="none";
           	alert("added successfully");
    	  
      }
     
     function showUpdateForm(id,name,price,quantity)
     {
   
    	document.getElementById("productName").value=name;
    	document.getElementById("productId").value=id;
    	document.getElementById("price").value=price;
    	document.getElementById("quantity").placeholder="available stock "+quantity;
    	document.getElementById("updateDiv").style.display="block";
       	
     }
     
     async function updateProduct() {
    	 
    	    
    	 
    	    let form = document.getElementById('updateInventoryForm');
    	    
 
    	    let formData = new FormData(form);
    	    
    	  
    	    let queryParams = new URLSearchParams(formData);
    	    queryParams.append("modifiedBy", sessionStorage.getItem("userId"));
           
    	    
    	    let url = 'http://localhost:3000/Struts_rest/inventory/update?' + queryParams.toString();
    	    
    	     fetch(url,{method:'POST'})
	    	  .then(response=>
	    	    {
				if(response.ok)
				  alert("product updated successfully");
				  document.getElementById("updateDiv").style.display="none";
				})
			  .catch(error=>
			  {
				alert("product updated successfullly");
				 document.getElementById("updateDiv").style.display="none";
			  })

			  	
			  	
    	}

     async function deleteProduct(productId)
     {
    	 let userConfirm=confirm("Are you Sure Do yo want to delete the product? ");
    	 if(userConfirm)
    	  {
    		 let url="http://localhost:3000/Struts_rest/inventory/delete?productId="+productId;
    		 let response=await fetch(url);
    		if(response.status==200)
    			{
    			    alert("The product has deleted successfully");
    			    window.location.reload();
    			}
    		else
    			{
    			  alert("error in deleting an item");
    			}
    	   }
     }
     
     function addToCart(productId)
     {
		quantity=prompt("Enter the number of items");
	     customerId=sessionStorage.getItem('userId');
	     const queryParams=new URLSearchParams();
    	  queryParams.append("customerId",customerId);
    	  queryParams.append("productId",productId);
    	  queryParams.append("quantity",quantity);
    	  
    	  const url=`http://localhost:3000/Struts_rest/cart/add?${queryParams.toString()}`;
    	  fetch(url,{method:'POST'})
    	  .then(response=>
    	    {
			if(response.ok)
			  alert("product addded successfully")
			})
		  .catch(error=>
		  {
			alert("Error in adding to cart")
		  })
	 }
	 
	 function showCartPage()
	 {
		
		window.location.href="../Cart/displayCart.html";
	 }
   