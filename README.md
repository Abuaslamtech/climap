## Climap -  Healthcare Facility Locator 🏥

CLIMAP is a full-stack (MERN) web app designed to help users locate healthcare facilities by state or local government. From the comfort of your room, you can access the locations of hospitals, clinics, and more – stress-free and convenient!  

## Features ✨

- **Facility Search**: Find healthcare facilities by name, location, or facility type
- **Interactive Map**: View facility locations on an interactive map interface
- **Advanced Filtering**: Filter facilities by state, local government area, and facility type
- **Facility Submission**: Submit new healthcare facilities to the database
- **Responsive Design**: Fully responsive interface that works on all devices
- **Real-time Updates**: Live search and filtering capabilities

## Tech Stack 🛠

### Frontend
- React.js
- Tailwind CSS
- Lucide Icons
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Prerequisites 📋

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation & Setup 🚀

1. Clone the repository
```bash
git clone https://github.com/abuaslamtech/climap.git
cd climap
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

5. Start the development servers

Backend:
```bash
cd backend
node index.js
```

Frontend:
```bash
cd frontend
npm run dev
```


## Project Structure 📁

```
healthcare-facility-locator/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   └── index.html
└── README.md
```

## Contributing 🤝

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request


## Support 💪

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/abuaslamtech/climap) page
2. Create a new issue if your problem isn't already listed
3. Contact the development team

## Acknowledgments 🙏

- Nigerian Healthcare Data Repository
- OpenStreetMap Contributors
- All contributors who help improve the platform

---

Built with ❤️ for improving healthcare accessibility in Nigeria
