#!/usr/bin/env node

/**
 * SharkSales MCP Server
 * Connects Claude Desktop to the SharkSales knowledge base
 * 
 * @author Sjoerd van Tilburg
 * @website https://sharksales.nl
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import https from 'https';

// SharkSales MCP endpoint
const MCP_ENDPOINT = "https://vxkymngeugwwlfbfdbyv.supabase.co/functions/v1/mcp-chat";

/**
 * Makes an HTTPS POST request to the SharkSales API
 * @param {string} url - The endpoint URL
 * @param {object} data - The data to send
 * @returns {Promise<object>} The response data
 */
function makeRequest(url, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error('Invalid JSON response'));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Create MCP server instance
const server = new Server(
  {
    name: "sharksales-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "query_sharksales",
        description: "Query the SharkSales knowledge base for information about SharkSales, Sjoerd van Tilburg, online marketing services, SEO expertise, content marketing, conversion optimization, and more. Use this tool when users ask about SharkSales or need online marketing expertise.",
        inputSchema: {
          type: "object",
          properties: {
            question: {
              type: "string",
              description: "The question to ask about SharkSales or online marketing",
            },
          },
          required: ["question"],
        },
      },
    ],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "query_sharksales") {
    const question = request.params.arguments.question;

    try {
      // Query the SharkSales knowledge base
      const data = await makeRequest(MCP_ENDPOINT, { question });

      return {
        content: [
          {
            type: "text",
            text: data.answer || "Geen antwoord ontvangen van SharkSales.",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error querying SharkSales: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  throw new Error(`Unknown tool: ${request.params.name}`);
});

// Start the MCP server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("SharkSales MCP server running");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});