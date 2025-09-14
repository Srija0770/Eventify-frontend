# 🎉 Eventify - Event Management Platform

A modern, responsive web application built with React.js that allows users to discover, browse, and register for events. Eventify provides a seamless experience for event management with features like event filtering, user authentication, favorites, and comprehensive analytics.

## ✨ Features

### 🏠 **Landing Page**
- Compelling hero section with call-to-action
- Featured events showcase
- Real-time statistics display
- Responsive navigation bar

### 📅 **Event Management**
- **Event Listing**: Grid/list view with advanced filtering
- **Search Functionality**: Find events by title
- **Category Filtering**: Filter by Technology, Sports, Cultural, Music, Workshops, etc.
- **Status Filtering**: Upcoming, Ongoing, Completed events
- **Event Details**: Comprehensive event information with images

### 👤 **User Features**
- **Firebase Authentication**: Email/password and Google sign-in
- **User Dashboard**: Manage registrations and view analytics
- **Event Registration**: Simple form with validation (name, email, phone)
- **Favorites/Bookmarks**: Save events for later
- **Registration Management**: Cancel registrations from dashboard

### 📊 **Analytics & Statistics**
- **Pie Chart**: Events registered by category
- **Bar Chart**: Category comparison
- **Quick Stats**: Total registrations, categories, most popular
- **Category Breakdown**: Detailed category analysis

### 🎨 **UI/UX Features**
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Bootstrap Styling**: Modern, clean interface
- **Loading States**: Smooth user experience
- **Form Validation**: Real-time validation feedback

## 🛠️ **Tech Stack**

### Frontend
- **React.js** 18+ with functional components and hooks
- **React Router** for navigation
- **Context API** for state management
- **Bootstrap 5.3.8** for styling
- **Firebase** for user authentication (Login or SignUp)
- **Recharts** for data visualization

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **CORS** enabled for cross-origin requests
- **RESTful API** design

## 🚀 **Getting Started**

### Prerequisites
- Node.js (v14 or higher)
- Firebase project setup
- **No local database required** - backend is deployed with MongoDB

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Srija0770/Eventify-frontend
   cd Eventify-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Backend is already deployed!** 🚀
   The backend is live at: [https://eventify-backend-hlyh.onrender.com](https://eventify-backend-hlyh.onrender.com)
   
   **No local backend setup required** - the frontend is configured to use the deployed backend by default.

### Optional Configuration

If you want to use a different backend URL, create a `.env` file:
```env
VITE_API_BASE_URL=https://your-custom-backend-url.com
```

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and add Email/Password and Google providers
3. Copy your Firebase config to `src/firebase.js`
4. Update the configuration with your project details

## 📱 **Screenshots & Demo**

### 🎥 **Application Demo Video**
Watch the complete application walkthrough:

https://youtu.be/vdG5yJk4zpg

### Login Page


### SignUp page


### Landing Page
![Landing Page](src/assets/Output-screenshots%20and%20videos/eventifytheeventmanagementplatform.netlify.app%20-%20Google%20Chrome%2014-09-2025%2016_59_48.png)

![Landing Page](src/assets/Output-screenshots%20and%20videos/eventifytheeventmanagementplatform.netlify.app%20-%20Google%20Chrome%2014-09-2025%2017_00_06.png)

![Landing Page](src/assets/Output-screenshots%20and%20videos/eventifytheeventmanagementplatform.netlify.app%20-%20Google%20Chrome%2014-09-2025%2017_00_15.png)


### Event Listing
- Responsive grid layout
- Advanced filtering options
- Search functionality
- Category and status filters

### Event Details
- Complete event information
- Registration form with validation
- Bookmark functionality
- Event image display

### User Dashboard
- Registration management
- Interactive charts and statistics
- Category breakdown
- Quick stats overview

### Dark Mode
- Toggle between light and dark themes
- Persistent theme selection
- Smooth transitions

## 🎯 **Project Structure**

```
Eventify-Frontend/
├── public/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Button.jsx
│   │   ├── EventCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── PublicRoute.jsx
│   ├── context/            # State management
│   │   └── EventsContext.jsx
│   ├── pages/              # Page components
│   │   ├── EventDetails.jsx
│   │   ├── EventRegisterForm.jsx
│   │   ├── EventsList.jsx
│   │   ├── FavouriteEvents.jsx
│   │   ├── LandingPage.jsx
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   └── UserDashboard.jsx
│   ├── styles/             # CSS files
│   │   ├── DarkMode.css
│   │   ├── EventDetails.css
│   │   ├── EventRegisterForm.css
│   │   ├── EventsList.css
│   │   ├── FavouriteEvents.css
│   │   ├── LandingPage.css
│   │   ├── Login.css
│   │   ├── SignUp.css
│   │   └── UserDashboard.css
│   ├── App.jsx
│   ├── firebase.js
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

## 🔧 **Available Scripts**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 **Deployment**

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variables
3. Deploy automatically on push

## 📊 **API Endpoints**

The frontend communicates with the deployed backend API at [https://eventify-backend-hlyh.onrender.com](https://eventify-backend-hlyh.onrender.com):

- `GET /api/eventDetails` - Fetch all events
- `GET /api/eventDetails/:id` - Fetch specific event
- `GET /api/users/:uid/favourites` - Get user favorites
- `POST /api/users/:uid/favourites` - Toggle favorite
- `GET /api/users/:uid/registrations` - Get user registrations
- `POST /api/users/:uid/registrations` - Create registration
- `DELETE /api/users/:uid/registrations/:id` - Cancel registration

**Backend Status**: ✅ Live and operational

## 🎨 **Design Features**

- **Unique CSS Classes**: All custom styles prefixed with `eventify-`
- **Bootstrap Integration**: Leverages Bootstrap 5.3.8 components
- **Responsive Grid**: Mobile-first responsive design
- **Dark Mode**: Complete theme switching capability
- **Loading States**: Smooth loading indicators
- **Form Validation**: Real-time validation with user feedback

## 🔐 **Authentication**

- **Firebase Authentication** integration
- **Email/Password** sign-in
- **Google Sign-in** option
- **Protected Routes** for authenticated users
- **Public Routes** for login/signup pages

## 📈 **Analytics & Charts**

- **Recharts** library for data visualization
- **Pie Chart**: Event distribution by category
- **Bar Chart**: Category comparison
- **Interactive Tooltips**: Hover for detailed information
- **Responsive Charts**: Adapt to different screen sizes

## 🚀 **Performance Features**

- **Context API**: Efficient state management
- **Lazy Loading**: Optimized component loading
- **Error Boundaries**: Graceful error handling
- **Loading States**: User-friendly loading indicators
- **Responsive Images**: Optimized image display

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 **Author**

**SAI SRIJA MUNDRU**
- GitHub: [@Srija0770](https://github.com/Srija0770)

## 🙏 **Acknowledgments**

- React.js community for excellent documentation
- Bootstrap team for the amazing UI framework
- Firebase for authentication services
- Recharts for beautiful chart components

---

**Live Demo**: [https://eventifytheeventmanagementplatform.netlify.app/](https://eventifytheeventmanagementplatform.netlify.app/) ✅ Live

**Backend API**: [https://eventify-backend-hlyh.onrender.com](https://eventify-backend-hlyh.onrender.com) ✅ Live

**Frontend Repository**: [https://github.com/Srija0770/Eventify-frontend](https://github.com/Srija0770/Eventify-frontend)

**Backend Repository**: [https://github.com/Srija0770/Eventify-backend](https://github.com/Srija0770/Eventify-backend)

---

<div align="center">
  <p>Made with ❤️ using React.js and Bootstrap</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>