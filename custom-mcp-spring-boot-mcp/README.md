# Custom MCP Server (Spring Boot) — VS Code Setup Guide

This project is a minimal Model Context Protocol (MCP) server built with Spring Boot and Spring AI. It runs over STDIO and is meant to be launched directly by VS Code via `.vscode/mcp.json`.

## Prerequisites
- Java 17+ (JDK)
- Maven 3.9+ (or use the included Maven Wrapper `mvnw.cmd`)
- VS Code 1.90+ with an MCP-capable client extension (e.g., Copilot / MCP client)

## Build the Server
From the project root:

```powershell
# Using Maven wrapper (recommended on Windows)
./mvnw.cmd -q clean package

# Or using a system Maven
mvn -q clean package
```

The build creates `target/custommcp-0.0.1-SNAPSHOT.jar`.

## How VS Code Knows About This Server
The file `.vscode/mcp.json` configures VS Code (or your MCP client) to start the server via STDIO:

```jsonc
{
  "servers": {
    "spring-custom-mcp": {
      "type": "stdio",
      "command": "java",
      "args": [
        "-jar",
        "target/custommcp-0.0.1-SNAPSHOT.jar"
      ]
    }
  },
  "inputs": []
}
```

- Server name: `spring-custom-mcp`
- Transport: STDIO (configured in `src/main/resources/application.properties`)
- Logging goes to `./logs/custommcp.log` to keep STDOUT/STDERR clean for MCP

## Run in VS Code
1. Open this folder in VS Code.
2. Ensure the MCP client is enabled to read `.vscode/mcp.json`.
3. Build the JAR once (see Build section).
4. Trigger the MCP client to start servers (varies by client). It will launch:
   - `java -jar target/custommcp-0.0.1-SNAPSHOT.jar`

If your client supports a “refresh”/“reload servers” action, use it after rebuilding.

## What This MCP Server Provides
The server exposes two tools, implemented in `com.example.custommcp.Util.McpTool`:
- getAllUsersData: Fetches all users from `https://jsonplaceholder.typicode.com/users`
- getAllTodosData: Fetches all todos from `https://jsonplaceholder.typicode.com/todos`

These are registered via `ToolCallbacks.from(mcpTool)` in `CustommcpApplication` and surfaced to the MCP client.

## Configuration Highlights
From `src/main/resources/application.properties`:
- `spring.ai.mcp.server.transport=STDIO` ensures STDIO transport
- `spring.main.web-application-type=none` disables the web server
- `logging.file.name=./logs/custommcp.log` routes logs to a file so STDIO stays protocol-clean

## Troubleshooting
- Build fails: Ensure Java 17+ is on PATH. Check with `java -version`.
- JAR missing: Run `./mvnw.cmd clean package` again and confirm the JAR exists under `target/`.
- VS Code can’t start the server:
  - Confirm `.vscode/mcp.json` points to `target/custommcp-0.0.1-SNAPSHOT.jar`.
  - Verify `java -jar target/custommcp-0.0.1-SNAPSHOT.jar` runs without errors in a terminal.
  - Check logs in `logs/custommcp.log` for stack traces.
- No tools showing in client: After the server starts, the MCP client should list tools `getAllUsersData` and `getAllTodosData`. If not, rebuild the JAR and reload the MCP servers.

## Clean and Rebuild Quickly
```powershell
./mvnw.cmd -q clean package
```

## License
This repo uses the default Spring Boot starter and example code. No additional license text is provided.
