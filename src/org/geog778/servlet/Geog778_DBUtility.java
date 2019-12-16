package org.geog778.servlet;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Geog778_DBUtility {

	private static final String Driver = "org.postgresql.Driver";
	private static final String ConnUrl = "jdbc:postgresql://localhost:5432/Geog778";
	
	private static final String Username = "postgres";
	private static final String password = "Gloworm2";
	
	private Connection connectDB() {
		Connection conn = null;
		try {
			Class.forName(Driver);
			conn = DriverManager.getConnection(ConnUrl, Username, password);
			System.out.println(conn);
			return conn;
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return conn;
	}
	
	public ResultSet queryDB(String sql) {
		Connection conn = connectDB();
		ResultSet res = null;
		try {
			if(conn != null) {
				Statement stmt = conn.createStatement();
				res = stmt.executeQuery(sql);
				conn.close();
				System.out.println(res);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return res;
	}
	//LLV180628003453
	
	public void modifyDB(String sql) {
		Connection conn = connectDB();
		
		try {
			if(conn != null) {
				Statement stmt = conn.createStatement();
				stmt.execute(sql);
				stmt.close();
				conn.close();
				
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
	}

	/*public static void main(String[] args) throws SQLException{
		// TODO Auto-generated method stub
		Geog778_DBUtility util = new Geog778_DBUtility();
		//util.queryDB("insert into user_info(first_name, last_name, email, address, phone) VALUES ('Scott', 'Carl', 'SC@gmail.com', '100 North Parkway', '8675309') ");
		ResultSet res = util.queryDB("select * from crimefinal where crimeid = 'LLV180628003453';");
		while (res.next()) {
			System.out.println(res.getString("type"));
	}
	}*/

}