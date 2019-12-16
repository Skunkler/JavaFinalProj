package org.geog778.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import org.geog778.servlet.Geog778_DBUtility;
import java.sql.*;
import java.util.HashMap;

/**
 * Servlet implementation class HttpServlet
 */
@WebServlet("/HttpServlet")
public class HttpServlet extends javax.servlet.http.HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see javax.servlet.http.HttpServlet#javax.servlet.http.HttpServlet()
     */
    public HttpServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	public void main() throws JSONException{
		
	}
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//doGet(request, response);
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		JSONObject data = new JSONObject();
		
		String tab_id = request.getParameter("tab_id");
		System.out.println(tab_id);
		
		if(tab_id.equals("0")) {
			//System.out.println("A report is submitted!");
			try {
				createReport(request, response);
			}catch(SQLException e ) {
				e.printStackTrace();
			}
		}
		
		else if(tab_id.equals("1")) {
			try {
				queryReport(request, response);
			}catch (JSONException e) {
				e.printStackTrace();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		else if(tab_id.equals("2")) {
			try {
				filterReport(request, response);
			}catch (JSONException e) {
				e.printStackTrace();
			}catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		else if(tab_id.equals("3")) {
			try {
				getHospitals(request, response);
			}catch (JSONException e) {
				e.printStackTrace();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		else if(tab_id.equals("4")) {
			try {
				getCensus(request, response);
			}catch (JSONException e) {
				e.printStackTrace();
			} catch(SQLException e) {
				e.printStackTrace();
			}
		} else if(tab_id.equals("5")) {
			try {
				getLaw(request, response);
			} catch(JSONException e) {
				e.printStackTrace();
			} catch(SQLException e) {
				e.printStackTrace();
			}
		}
	}
	private void getLaw(HttpServletRequest request, HttpServletResponse response) throws JSONException, SQLException, IOException{
		JSONArray list = new JSONArray();
		String sql = "select ST_AsText(geom) as Location_area from law_enforcement_final";
		LawHelper(sql, list);
		response.getWriter().write(list.toString());
	}
	private void getCensus(HttpServletRequest request, HttpServletResponse response) throws JSONException, SQLException, IOException{
		JSONArray list = new JSONArray();
		String sql = "select ST_AsText(geom) as Location_area, name, population, male, female, fifteen_to_nineteen_years, twenty_to_twentyfour_years, twentyfive_to_thirtyfour_years, over_65_years, married_couple, male_head, female_head, non_family, highschoolgraduate, collegegraduate, own, rent, medianincome, persons_below_poverty from census_2017_final INNER JOIN census_stats on name = nameid";
		CensusHelper(sql, list);
		response.getWriter().write(list.toString());
	}
	
	
	
	
	private void getHospitals(HttpServletRequest request, HttpServletResponse response) throws JSONException, SQLException, IOException{
		JSONArray list = new JSONArray();
		String sql = "select ST_AsText(geom) as Location, numbeds from hospital_final";
		hospitalHelper(sql, list);
		response.getWriter().write(list.toString());
	}
	
	
	private void createReport(HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException{
		Geog778_DBUtility dbutil = new Geog778_DBUtility();
		String sql;	
		int contact_id;
		String user_fn = request.getParameter("user_fn");
		String user_ln = request.getParameter("user_ln");
		String user_day = request.getParameter("user_day");
		String user_month = request.getParameter("user_month");
		String user_year = request.getParameter("user_year");
		String description = request.getParameter("user_decs");
		String Lat = request.getParameter("user_lat");
		String Lon = request.getParameter("user_lon");
		if(description != null) {description = "'" + description + "'";}
		if(user_fn != null) {user_fn = "'" + user_fn + "'";}
		if(user_ln != null) {user_ln = "'" + user_ln + "'";}
		if(user_day != null) {user_day = user_day;}
		if(user_month != null) {user_month = user_month;}
		if(user_year != null) {user_year = user_year;}
		
		if(Lat != null && Lon != null) {
			sql = "insert into user_submission(firstname, lastname, day, month, year, description, geom) VALUES(" + user_fn + ", " + user_ln + ", " + user_day + ", " + user_month + ", " + user_year + ", " + description + ", ST_GeomFromText('POINT(" + Lat + " " + Lon + ")" + "'" + ", 4326))";
					
		
		
		System.out.println(sql);
		dbutil.modifyDB(sql);		
		JSONObject data = new JSONObject();
		try{
		data.put("status", "success");
		
		}catch (JSONException e) {
			e.printStackTrace();
		}
		response.getWriter().write(data.toString());
		
		}else {
		System.out.println("error");	
		}
		
	}
	
	private void queryReport(HttpServletRequest request, HttpServletResponse response) throws JSONException, SQLException, IOException{
		JSONArray list = new JSONArray();
		
		String CrimeType = request.getParameter("CrimeType");
		String Month = request.getParameter("Month");
		String Day = request.getParameter("Day");
		String Year = request.getParameter("Year");
		if(CrimeType != null) {CrimeType = "'" + CrimeType + "'";}
		//System.out.println(request.getParameter("description"));
		String sql = "select type, ST_AsText(geom) as location_area from crimefinal where day = " + Day + " and month = " + Month + " and year = " + Year + " and type=" + CrimeType;
		System.out.println(sql);
		queryReportHelper(sql, list);
		response.getWriter().write(list.toString());
		}
	private void LawHelper(String sql, JSONArray list) throws SQLException{
		Geog778_DBUtility dbutil = new Geog778_DBUtility();
		ResultSet res = dbutil.queryDB(sql);
		while(res.next()) {
			HashMap<String, String> m = new HashMap<String, String>();
			m.put("Location", res.getString("Location_area"));
			list.put(m);
		}
	}
	
	private void CensusHelper(String sql, JSONArray list) throws SQLException{
		Geog778_DBUtility dbutil = new Geog778_DBUtility();
		ResultSet res = dbutil.queryDB(sql);
		while(res.next()) {
			HashMap<String, String> m = new HashMap<String, String>();
			m.put("location", res.getString("Location_area"));
			m.put("name", res.getString("name"));
			m.put("population", res.getString("population"));
			m.put("male", res.getString("male"));
			m.put("female", res.getString("female"));
			m.put("fifteen_to_nineteen_years", res.getString("fifteen_to_nineteen_years"));
			m.put("twenty_to_twentyfour_years", res.getString("twenty_to_twentyfour_years"));
			m.put("twentyfive_to_thirtyfour_years", res.getString("twentyfive_to_thirtyfour_years"));
			m.put("over_65_years", res.getString("over_65_years"));
			m.put("married_couple", res.getString("married_couple"));
			m.put("male_head", res.getString("male_head"));
			m.put("female_head", res.getString("female_head"));
			m.put("non_family", res.getString("non_family"));
			m.put("highschoolgraduate", res.getString("highschoolgraduate"));
			m.put("collegegraduate", res.getString("collegegraduate"));
			
			m.put("rent", res.getString("rent"));
			m.put("own", res.getString("own"));
			m.put("medianincome", res.getString("medianincome"));
			m.put("persons_below_poverty", res.getString("persons_below_poverty"));
			list.put(m);
		}
	}
	private void hospitalHelper(String sql, JSONArray list) throws SQLException{
		Geog778_DBUtility dbutil = new Geog778_DBUtility();
		ResultSet res = dbutil.queryDB(sql);
		while(res.next()) {
			HashMap<String, String> m = new HashMap<String, String>();
			m.put("Location", res.getString("Location"));
			m.put("numbeds", res.getString("numbeds"));
			list.put(m);
		}
	}
	
	
	private void queryReportHelper(String sql, JSONArray list) throws SQLException{
			Geog778_DBUtility dbutil = new Geog778_DBUtility();
			
			ResultSet res = dbutil.queryDB(sql);
			System.out.println(sql);
			while(res.next()) {
				HashMap<String, String> m = new HashMap<String, String>();
				
				m.put("Type of Crime", res.getString("type"));
				m.put("Location", res.getString("location_area"));
			
				list.put(m);
				
			}
		}
	
	
	private void filterReport(HttpServletRequest request, HttpServletResponse response) throws JSONException, SQLException, IOException{
		JSONArray list = new JSONArray();
		
		String CrimeType = request.getParameter("CrimeType");
		String MonthStart = request.getParameter("MonthStart");
		String YearStart = request.getParameter("YearStart");
		String MonthEnd = request.getParameter("MonthEnd");
		String YearEnd = request.getParameter("YearEnd");
		if(CrimeType != null) {CrimeType = "'" + CrimeType + "'";}
		
		String sql = "select type, ST_AsText(geom) as location_area from crimefinal where type = " + CrimeType + " and Month >= " + MonthStart + " and Year >= " + YearStart + " and Month <= " + MonthEnd + " and Year <= " + YearEnd;
		filterHelper(sql, list);
		response.getWriter().write(list.toString());
		
		
	}
	
	private void filterHelper(String sql, JSONArray list) throws SQLException{
		Geog778_DBUtility dbutil = new Geog778_DBUtility();
		
		ResultSet res = dbutil.queryDB(sql);
		System.out.println(sql);
		
		while(res.next()) {
			HashMap<String, String> m = new HashMap<String, String>();
			
			m.put("Type of Crime", res.getString("type"));
			m.put("Location", res.getString("location_area"));
		
			list.put(m);
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	}


