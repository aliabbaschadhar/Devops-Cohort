// export default {
// 	async fetch(request, env, ctx): Promise<Response> {
// 		return new Response('Hello World!' + Math.random());
// 	},
// } satisfies ExportedHandler<Env>;


// Define the main handler object for the serverless function
const main: ExportedHandler<Env> = {
	// The fetch method is called whenever an HTTP request is received
	fetch(request, env, ctx): Response {
		// Create and return a new HTTP response with a custom message
		return new Response("Hello World " + "shaka-g ")
	}
}

// Export the main handler as the default export of this module
export default main;
