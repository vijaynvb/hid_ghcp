package com.example.custommcp;

import java.util.List;
import org.springframework.ai.support.ToolCallbacks;
import org.springframework.ai.tool.ToolCallback;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import java.util.Arrays;

import com.example.custommcp.Util.McpTool;

@SpringBootApplication
public class CustommcpApplication {

	public static void main(String[] args) {
		SpringApplication.run(CustommcpApplication.class, args);
	}

	@Bean
	public List<ToolCallback> mcpToolCallback(McpTool mcpTool) {
		return Arrays.asList(ToolCallbacks.from(mcpTool));
	}
}
