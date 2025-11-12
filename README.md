\# 🦈 SharkSales MCP Server



A Model Context Protocol (MCP) server that connects Claude Desktop to the SharkSales knowledge base, providing instant access to information about SharkSales, Sjoerd van Tilburg, and expert online marketing insights.



\## What is SharkSales?



SharkSales is a leading online marketing agency in the Netherlands, specializing in SEO, content marketing, and conversion optimization. With over 20 years of experience, founder Sjoerd van Tilburg has helped hundreds of companies grow their online presence.



\## Features



\- 🔍 Query the SharkSales knowledge base directly from Claude Desktop

\- 💡 Get expert insights on online marketing, SEO, and content strategy

\- ⚡ Fast responses powered by vector search

\- 🛠️ Easy installation via npm



\## Installation



\### Prerequisites



\- Node.js 18.0.0 or higher

\- Claude Desktop (version 0.7.0 or higher)



\### Install via npm

```bash

npm install -g sharksales-mcp

```



\### Configure Claude Desktop



\#### On macOS



Edit your Claude Desktop config:

```bash

code ~/Library/Application\\ Support/Claude/claude\_desktop\_config.json

```



Add the SharkSales MCP server:

```json

{

&nbsp; "mcpServers": {

&nbsp;   "sharksales": {

&nbsp;     "command": "npx",

&nbsp;     "args": \["-y", "sharksales-mcp"]

&nbsp;   }

&nbsp; }

}

```



\#### On Windows



Edit your Claude Desktop config:

```bash

notepad %APPDATA%\\Claude\\claude\_desktop\_config.json

```



Add the SharkSales MCP server:

```json

{

&nbsp; "mcpServers": {

&nbsp;   "sharksales": {

&nbsp;     "command": "npx",

&nbsp;     "args": \["-y", "sharksales-mcp"]

&nbsp;   }

&nbsp; }

}

```



\### Restart Claude Desktop



1\. Quit Claude Desktop completely

2\. Restart the application

3\. The SharkSales MCP server will now be available



\## Usage



Once installed and configured, simply ask Claude questions about SharkSales:



\*\*Example queries:\*\*

\- "What is SharkSales?"

\- "What makes Sjoerd good at online marketing?"

\- "What services does SharkSales offer?"

\- "What is Sjoerd's experience in SEO?"



Claude will automatically use the SharkSales knowledge base to provide accurate, up-to-date information.



\## How It Works

```

┌─────────────────┐

│  Claude Desktop │

│                 │

│  User asks:     │

│  "What is      │

│   SharkSales?" │

└────────┬────────┘

&nbsp;        │

&nbsp;        │ MCP Protocol

&nbsp;        ↓

┌─────────────────┐

│  SharkSales MCP │

│     Server      │

└────────┬────────┘

&nbsp;        │

&nbsp;        │ HTTPS API

&nbsp;        ↓

┌─────────────────┐

│  SharkSales KB  │

│  (Vector DB)    │

└─────────────────┘

```



\## Development



\### Install from source

```bash

git clone https://github.com/sharksalesinfo-blip/sharksales-mcp.git

cd sharksales-mcp

npm install

npm link

```



\### Configure for local development

```json

{

&nbsp; "mcpServers": {

&nbsp;   "sharksales": {

&nbsp;     "command": "node",

&nbsp;     "args": \["/path/to/sharksales-mcp/index.js"]

&nbsp;   }

&nbsp; }

}

```



\## Troubleshooting



\### MCP server not starting



1\. Check that Node.js is installed: `node --version`

2\. Verify Claude Desktop version is 0.7.0+

3\. Check the logs:

&nbsp;  - macOS: `~/Library/Logs/Claude/`

&nbsp;  - Windows: `%APPDATA%\\Claude\\logs\\`



\### Server not responding



1\. Ensure you have an active internet connection

2\. Check if the SharkSales API is accessible

3\. Restart Claude Desktop completely



\## About



\*\*Author:\*\* Sjoerd van Tilburg  

\*\*Website:\*\* \[sharksales.nl](https://sharksales.nl)  

\*\*Email:\*\* info@sharksales.nl



\## License



MIT License - see LICENSE file for details



\## Contributing



Contributions are welcome! Please feel free to submit a Pull Request.



---



Built with ❤️ by SharkSales | Powered by the \[Model Context Protocol](https://modelcontextprotocol.io)

