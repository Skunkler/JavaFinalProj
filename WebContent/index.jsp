<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<!--head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

</body>
</html-->

<head>
<meta http-equiv="Content-Type" content="width=device-width, initial-scale=1 text/html; charset=ISO-8859-1">
<title>Web Project</title>
    <script src="js/jquery-3.3.1.min.js"></script>
 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
   integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
   crossorigin=""/>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>


    

<link rel="stylesheet" href="css/leaflet.css">

<link rel="stylesheet" href="css/Style.css">
</head>

<body>
    
    
    
    
    <div id="map-canvas"></div>
    
    <span id='opensign' onclick="openNav()">open</span>
    
    <div id="mySidenav" class="sidenav">
  <a href="javascript:void(0)" class="closebtn" onclick='closeNav()'>&times;</a>
  <div><a href="javascript:void(0)" onclick="openQuery()">Query Crime Reports</a></div>
  <div><a href="javascript:void(0)" onclick="openFilter()">Filter criminal incidents</a></div>
  <div><a href="javascript:void(0)" onclick="openLocation()">User Location</a></div>
  <div><a href="javascript:void(0)" onclick="openSubmit()">submit reported incident</a></div>
  <div><a href="javascript:void(0)" onclick="openCensus()">census tract stats</a></div>
</div>
    
    <form id="QueryTab" class="sidenav">
    
        <a href="javascript:void(0)" class="closebtn" onclick="closeQuery()">&times;</a>
        <div>
        <label>Type of Crime:</label>
                <select name="CrimeType">
                  <option value="">Choose Crime Type</option>
                  <option value="JUVENILE DISTURBANCE">JUVENILE DISTURBANCE</option>
                  <option value="INDECENT EXPOSURE">INDECENT EXPOSURE</option>
                  <option value="ASSAULT/BATTERY W/OTHER DEADLY">ASSAULT/BATTERY W/OTHER DEADLY</option>
                  <option value="BURGLARY">BURGLARY</option>
                  <option value="PERSON WITH A GUN">PERSON WITH A GUN</option>
                  <option value="HOMICIDE">HOMICIDE</option>
                  <option value="ASSAULT/BATTERY">ASSAULT/BATTERY</option>
                  <option value="ASSAULT/BATTERY NEGATIVE INJUR">ASSAULT/BATTERY NEGATIVE INJURY</option>
                  <option value="OTHER DISTURBANCE">OTHER DISTURBANCE</option>
                  <option value="ASSAULT/BATTERY W/A GUN">ASSAULT/BATTERY W/A GUN</option>
                  <option value="LARCENY FROM PERSON NON ROBBE">Larceny</option>
                  <option value="MALICIOUS DESTRUCTION OF PROPE">destruction of property</option>
                  <option value="ROBBERY">Robbery</option>
                  <option value="PERSON WITH A KNIFE">PERSON WITH A KNIFE</option>
                  <option value="RECOVERED MOTOR VEHICLE">Recovered Motor Vehicle</option>
                  <option value="AUTO BURGLARY">AUTO Burglary</option>
                  <option value="FIGHT">FIGHT</option>
                  <option value="PERSON WITH/OTHER DEADLY WEAPO">Person with deadly weapon</option>
                  <option value="STOLEN MOTOR VEHICLE">STOLEN MOTOR VEHICLE</option>
                </select>
              <label>Month</label>
                <select name="Month">
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
        </select>
        
        <div><label>Day</label><input placeholder = "enter day ex 14" name="Day"></div>
        <label>Year</label>
        
        <select name="Year">
            <option value="16">2016</option>
            <option value="17">2017</option>
            <option value="18">2018</option>
            
            </select>
        
        
        
        <div><button type="submit">submit</button></div>
        
        </div>
    </form>
    
    
    <form id="FilterTab" class="sidenav">
    <div>
        <a href="javascript:void(0)" class="closebtn" onclick="closeFilter()">&times;</a>
        
        <label>Type of Crime:</label>
                <select name="CrimeType">
                  <option value="">Choose Crime Type</option>
                  <option value="JUVENILE DISTURBANCE">JUVENILE DISTURBANCE</option>
                  <option value="INDECENT EXPOSURE">INDECENT EXPOSURE</option>
                  <option value="ASSAULT/BATTERY W/OTHER DEADLY">ASSAULT/BATTERY W/OTHER DEADLY</option>
                  <option value="BURGLARY">BURGLARY</option>
                  <option value="PERSON WITH A GUN">PERSON WITH A GUN</option>
                  <option value="HOMICIDE">HOMICIDE</option>
                  <option value="ASSAULT/BATTERY">ASSAULT/BATTERY</option>
                  <option value="ASSAULT/BATTERY NEGATIVE INJUR">ASSAULT/BATTERY NEGATIVE INJURY</option>
                  <option value="OTHER DISTURBANCE">OTHER DISTURBANCE</option>
                  <option value="ASSAULT/BATTERY W/A GUN">ASSAULT/BATTERY W/A GUN</option>
                  <option value="LARCENY FROM PERSON NON ROBBE">Larceny</option>
                  <option value="MALICIOUS DESTRUCTION OF PROPE">destruction of property</option>
                  <option value="ROBBERY">Robbery</option>
                  <option value="PERSON WITH A KNIFE">PERSON WITH A KNIFE</option>
                  <option value="RECOVERED MOTOR VEHICLE">Recovered Motor Vehicle</option>
                  <option value="AUTO BURGLARY">AUTO Burglary</option>
                  <option value="FIGHT">FIGHT</option>
                  <option value="PERSON WITH/OTHER DEADLY WEAPO">Person with deadly weapon</option>
                  <option value="STOLEN MOTOR VEHICLE">STOLEN MOTOR VEHICLE</option>
                </select>
        
        <label>Start date</label>
          <select name="MonthStart">
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
        </select>
             
         <select name="YearStart">
            <option value="16">2016</option>
            <option value="17">2017</option>
            <option value="18">2018</option>
            
            </select>
        <label>End date</label>
             <div> <select name="MonthEnd">
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
        </select>
         <select name="YearEnd">
            
            <option value="16">2016</option>
            <option value="17">2017</option>
            <option value="18">2018</option>
            
            </select>
        
        
        </div>
    
    
    
    <div><button type="submit">submit</button></div>
        </div>
    </form>
    
    <div id="Location" class="sidenav">
<a href="javascript:void(0)" class="closebtn" onclick="closeLocation()">&times;</a>
</div>
    
   <div id="CensusTab" class="sidenav">
   <a href="javascript:void(0)" class="closebtn" onclick="closeCensus()">&times;</a>
   
   </div>
   
   
    <form id="SubmitTab" class="sidenav">
    <div>
        <a href="javascript:void(0)" class="closebtn" onclick="closeSubmit()">&times;</a>
        <div><label>First Name &nbsp</label><input placeholder = "First Name" name="user_fn"></div>
		<div><label>Last Name &nbsp</label><input placeholder = "Last Name" name="user_ln"></div>
		<div><label>Day</label><input placeholder = "enter day" name = "user_day"></div>
		<div><label>Month</label><select name="user_month">
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
        </select></div>
        <div><label>Year</label><input placeholder = "enter year" name="user_year"></div>
        <div><label>decription of crime</label><input placeholder = "enter description" name="user_decs"></div>
        <div><label>latitude</label><input placeholder="enter lat" name="user_lat"></div>
        <div><label>longitude</label><input placeholder="enter lon" name="user_lon"></div>
        <div><button type="submit">submit</button></div>
        </div>
    
    
    
    
    </form>
    
    
    
    
   <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"
 integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw=="
   crossorigin=""></script>
    <script type="text/javascript">
        
    function openSubmit(){
        document.getElementById("SubmitTab").style.width = "250px";
    }
        function closeSubmit(){
            document.getElementById("SubmitTab").style.width = "0px";
        }
function openCensus(){
	document.getElementById("CensusTab").style.width = "250px";
	
}
function closeCensus(){
	document.getElementById("CensusTab").style.width = "0px";
}
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
function closeNav(){
    document.getElementById("mySidenav").style.width="0px";
}

function openQuery(){
    document.getElementById('QueryTab').style.width = "250px";
}

function closeQuery(){
    document.getElementById('QueryTab').style.width = "0px";
}
        
function openFilter(){
    document.getElementById("FilterTab").style.width="250px";
}        
function closeFilter(){
    document.getElementById("FilterTab").style.width = "0px";
}
function openLocation(){
    document.getElementById("Location").style.width = "250px";
}
function closeLocation(){
    document.getElementById("Location").style.width="0px";
}
        
    </script>
    <script src="js/jquery-migrate-3.0.1.min.js"></script>
    <script type="text/javascript" src="js/Hospital_Final.geojson"></script>
    <script type="text/javascript" src="js/law_enforcement.geojson"></script>
    
    <script src='js/main.js'></script>
    <script src='js/loadform.js'></script>
    </body>