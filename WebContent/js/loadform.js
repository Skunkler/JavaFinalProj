function UserSubmit(event){
	event.preventDefault();
	//alert("successfully created report, an administrator will verify your input!");
	var c = $("#SubmitTab").serializeArray();
	c.push({name: "tab_id", value: "0"});
	
	c = c.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: c,
		succes: function(reports){
			alert("Success! user input created!")
			//document.getElementById("SubmitTab").reset();
			//use ajax again to query all entries in the database and regenerate the map, thus displaying our newly entered data on the map
			$.ajax({
				url: 'HttpServlet',
				type: 'POST',
				data: c,
				success: function(reports) {
					alert("success user input has been created!");
				},
				error: function(xhr, status, error){
					alert("An AJAX error occured: " + status + "\Error: " + error);
				}
			});
			
			},
				
			error: function(xhr, status, error){
				alert("Status: " + status + "\nError: " + error);
			}
		});
		
	}
	//calls the createReport function when a create_report_form has been submitted by the us
	$('#SubmitTab').on("submit", UserSubmit);
	
	
	  


