# BazaarPlanner
A web application for planning and optimizing your Bazaar strategies.

Builds and Releases upon push to production to https://www.bazaarplanner.com
Or, runs locally at http://localhost:3000

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation and Development

1. Clone the repository:
    git clone https://github.com/oceanseth/BazaarPlanner.git
    cd BazaarPlanner

2. Install dependencies:
    npm install

3. Run the development server:
    npm run dev
    
    This will start the local server at http://localhost:3000

4. Build for production: (runs automatically upon push to production)
    npm run build
    
    The built files will be in the build directory.

## 📁 Project Structure
- `js/` - Main javascript Classes. Lowercase filesnames are utility/initial setup scripts.
- `public/` - Static assets (images, etc.) these will be pushed to s3 
- `build/` - Production build output (generated)
- `import-lambda/` - Legacy Lambda function for the bazaartracker import functionality (not used anymore)

## 🔧 Tech Stack
- Vite - Build tool and development server
- AWS (S3 + CloudFront) - Hosting and CDN

## 🤝 Contributing
Contributions are welcome! Feel free to submit issues and pull requests.

## 🎥 Development Streams
Development of this project is occasionally streamed on [Twitch](https://twitch.tv/simplystrong). Follow to catch future development sessions!

## 📝 License
This project is open source and available under the MIT License.

## ✨ Author
Created by Seth Caldwell
- Twitch: [SimplyStrong](https://twitch.tv/simplystrong)
- GitHub: [oceanseth](https://github.com/oceanseth)

## 🔮 Future Plans
- See the About section for more information.

## Email Documentation
Emails received by the support email address are saved in s3 bucket bazaarplanner.com/emails. We still need to write a lambda to forward these to our team email address.
To send an email from the console as our team staff, use the following command:
aws ses send-email --from "support@bazaarplanner.com" --destination "ToAddresses=someemail@somedomain.com" --message "{\"Subject\": {\"Data\": \"testing email from console\"},\"Body\":{\"Text\":{\"Data\":\"lets see if this works\"}}}"

Feel free to star ⭐ the repo if you find it useful!
