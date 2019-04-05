using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace Interview
{
    public class HttpRequester
    {
        public HttpRequester() {
        }

        public async Task<string> SurroundText(string url, string beginning, string end)
        {
            var httpClient = new HttpClient();
            var result = await httpClient.GetAsync(url);
            var content = await result.Content.ReadAsStringAsync();
            return string.Join(",", beginning, content, end);
        }
    }
}