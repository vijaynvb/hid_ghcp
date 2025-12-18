package com.example.custommcp.Util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Service;

@Service
public class McpTool {
    
     /**
     * Adds a tool to get all users' data from jsonplaceholder.typicode.com
     *
     * @return A string containing all users' data in JSON format.
     */
    @Tool(name = "getAllUsersData", description = "Fetches all users' data from jsonplaceholder.typicode.com")
    public String getAllUsersData() {
        String url = "https://jsonplaceholder.typicode.com/users";
        StringBuilder response = new StringBuilder();

        try {
            URL apiUrl = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) apiUrl.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");

            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
            }

            try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
                String output;
                while ((output = br.readLine()) != null) {
                    response.append(output);
                }
            }

            conn.disconnect();
        } catch (Exception e) {
            return "{\"error\":\"" + e.getMessage() + "\"}";
        }

        return response.toString();
    }

     /**
     * Adds a tool to get all todos' data from jsonplaceholder.typicode.com
     *
     * @return A string containing all todos' data in JSON format.
     */
    @Tool(name = "getAllTodosData", description = "Fetches all todos' data from jsonplaceholder.typicode.com")
    public String getAllTodosData() {
        String url = "https://jsonplaceholder.typicode.com/todos";
        StringBuilder response = new StringBuilder();

        try {
            URL apiUrl = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) apiUrl.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");

            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
            }

            try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
                String output;
                while ((output = br.readLine()) != null) {
                    response.append(output);
                }
            }

            conn.disconnect();
        } catch (Exception e) {
            return "{\"error\":\"" + e.getMessage() + "\"}";
        }

        return response.toString();
    }
}
