/**
 * 
 */
//new validator
function validate(role)
{
   if(role==null)
   {
	 window.location.href="../../index.html";
	 logout();
   }
   
	 if(role==1)
	   {
		   if(sessionStorage.getItem('role')!=role&&sessionStorage.getItem('role')!=2)
		     {
			  logout();
		      window.location.href="../../index.html";
		      }
		}
		else if(sessionStorage.getItem('role')!=role)
		{
			  logout();
			  window.location.href="../../index.html";
		}
}

	

 
 
 function logout()
 {
	sessionStorage.clear();
	 window.location.href="../../index.html"
 }
 