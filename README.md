# GitHub Repositories Search Page
This project is a GitHub repositories search page built with Angular 17, Angular Material and .NET Framework/.NET 6 (Web API).<br>
It allows users to search for GitHub repositories and bookmark them in their session, using a custom session implementation with JWT authentication for client-server communication.

# Key Features:
- Repository Search: Users can search GitHub repositories by typing keywords and pressing a button or Enter key. The search is performed via the GitHub API.
- Search Results Display: Search results are displayed in a gallery format, with each repository showing the repository name, owner avatar, and a bookmark button.
- Bookmarking: Users can bookmark repositories, and the data is stored in the user's session.
- JWT Authentication: Client-server communication is secured using JSON Web Tokens (JWT).
- Extra Feature: A separate screen shows all bookmarked repositories.

# How to Run the Project:
1. Clone the repository.
2. Install required dependencies for Angular frontend.
3. Start the backend server with enter folder githubSearchRepositories\githubSearchRepositoriesBack\githubPhoenix\bin\Debug\net6.0 and open githubPhoenix.exe. (you start in prod mode)
4. frontend development server enter folder githubSearchRepositories\githubSearchRepositoriesFront and run ng serve --configuration production.
5. Access the application in your browser http://localhost:4200/.

# How to launch the project for development mode.
1. Start the backend server with enter folder githubSearchRepositories\githubSearchRepositoriesBack\ and open githubPhoenix.sln.
2. frontend development server enter folder githubSearchRepositories\githubSearchRepositoriesFront and run ng serve --configuration development.
3. Access the application in your browser http://localhost:4200/.

# Technologies Used:
- Frontend: Angular 17 and Angular Material.
- Backend: .NET Framework/.NET 6 (Web API).
- Authentication: JWT (JSON Web Token).
- GitHub API: Used to fetch repository data.

# Instructions for Setup:
1. Clone the repo.
2. Navigate to the backend folder and run the .NET Web API with Visual Studio build.
3. Navigate to the frontend folder and run the Angular application 'ng serve'.
4. Open the web in the url 'localhost:4200' and start searching for repositories.

# Credits
### Uriel Hajaj
