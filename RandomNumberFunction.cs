using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace RandomNumberFunctionApp.Functions
{
    public class RandomNumberFunction
    {
        private readonly ILogger _logger;

        public RandomNumberFunction(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<RandomNumberFunction>();
        }

        [Function("RandomNumberFunction")]
        public HttpResponseData Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req)
        {
            _logger.LogInformation("Generating random number...");

            var random = new Random();
            int number = random.Next(1, 1001); // 1 - 1000 inclusive

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "application/json; charset=utf-8");
            response.WriteString($"{{ \"randomNumber\": {number} }}");

            return response;
        }
    }
}
