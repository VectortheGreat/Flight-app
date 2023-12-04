# Flight App

A flight app that filters Schiphol flight data in various ways

## Features:

- **Departure - Arrival Flight Filter**
- **Day Filter**
- **Schedule Time - City&Airport Information - Aircraft Types - Current Status of the Flights - Destinations**
- **Flight Detail Page**
- **Responsive CSS**

## Usage:

1. Download the Project. Extract the files and open the folder in the terminal and run:

   ```bash
   npm install

   ```

2. Create a Schiphol Account to take the API Key and ID:
   [Schiphol Dev](https://www.schiphol.nl/en/developer-center/)

3. Enter your API Key and ID in config.js
4. Open the terminal and run `npm run dev` to start the project
5. If you get CORS errors, follow these steps:

- Open Run (Shortkey Ctrl+R)
  -Paste this `chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security` and click OK
  -Test your project with this browser, The project will not get CORS errors, but since this error is caused by the server, there is nothing I can do from the Frontend side. [More Information](https://community.fabric.microsoft.com/t5/Developer/Error-No-Access-Control-Allow-Origin-header-is-present-on-the/m-p/351506#M10446)

## Important

- Since I tested with the free API plan, I had limited usage. For example, it brings 20 flights to one page. You can bring more flights, but when you bring too many flights in a short time, you will receive the **"429 Too Many Requests Error"**. At the same time, since I had to make a separate request for Destinations and Aircraft, I had to send many more requests to the server. That's why I couldn't offer a solution to this.
