# 🏠 Mybnb - Airbnb Clone

A full-stack web application inspired by Airbnb built with Node.js, Express, MongoDB, and EJS. Users can browse listings, create accounts, add properties, leave reviews, and view locations on interactive maps.

## ✨ Features

- 🔐 **User Authentication** - Secure signup/login with Passport.js
- 🏡 **CRUD Operations** - Create, read, update, delete listings
- ⭐ **Reviews & Ratings** - 5-star rating system with comments
- 🗺️ **Interactive Maps** - MapTiler geocoding with Mapbox visualization
- 🖼️ **Image Upload** - Cloudinary integration with Multer
- 🔍 **Search** - Search by title, location, country, or description
- 📱 **Responsive Design** - Mobile-first design with Bootstrap
- 🔒 **Authorization** - Owner-only edit/delete permissions
- ✅ **Validation** - Client & server-side with Joi

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** EJS, Bootstrap 5, CSS3, JavaScript
- **Authentication:** Passport.js, passport-local-mongoose
- **Storage:** Cloudinary (images), MongoDB (sessions)
- **Maps:** MapTiler Geocoding API, Mapbox GL JS
- **Validation:** Joi
- **Other:** Multer, connect-flash, method-override, dotenv, ejs-mate

## 📁 Project Structure

```
Airbnb/
├── app.js                      # Main application entry point
├── package.json                # Dependencies and scripts
├── .env                        # Environment variables (not in repo)
├── .gitignore                 # Git ignore file
│
├── Models/                     # Mongoose schemas
│   ├── listing.js             # Listing model with geometry
│   ├── reviews.js             # Review model
│   └── user.js                # User model with passport plugin
│
├── Routes/                     # Express route handlers
│   ├── listing.js             # Listing CRUD routes
│   ├── review.js              # Review routes
│   └── user.js                # Auth routes (signup/login/logout)
│
├── controllers/                # Business logic
│   ├── listings.js            # Listing controller methods
│   ├── reviews.js             # Review controller methods
│   └── user.js                # User controller methods
│
├── views/                      # EJS templates
│   ├── layouts/
│   │   └── boilerplate.ejs    # Main layout template
│   ├── includes/
│   │   ├── navbar.ejs         # Navigation bar
│   │   ├── footer.ejs         # Footer
│   │   └── flash.ejs          # Flash messages
│   ├── listings/
│   │   ├── index.ejs          # All listings page
│   │   ├── show.ejs           # Individual listing detail
│   │   ├── new.ejs            # Create listing form
│   │   └── edit.ejs           # Edit listing form
│   ├── users/
│   │   ├── signup.ejs         # Signup form
│   │   └── login.ejs          # Login form
│   └── error.ejs              # Error page
│
├── public/                     # Static assets
│   ├── CSS/
│   │   ├── style.css          # Main styles & responsive layouts
│   │   ├── navbar.css         # Navbar styles with responsive breakpoints
│   │   ├── listings.css       # Listing card styles
│   │   ├── forms.css          # Authentication & listing form styles
│   │   └── rating.css         # Star rating styles
│   └── js/
│       ├── map.js             # Mapbox initialization
│       ├── show.js            # Listing detail page functionality
│       ├── listings.js        # Tax toggle functionality
│       └── form-validation.js # Bootstrap form validation
│
├── utils/                      # Utility modules
│   ├── ExpressError.js        # Custom error class
│   └── wrapAsync.js           # Async error wrapper
│
├── initialization/             # Database seeding
│   ├── data.js                # Sample listing data
│   └── index.js               # Seed script
│
├── middleware.js               # Custom middleware (auth, validation)
├── schema.js                   # Joi validation schemas
└── cloudConfig.js              # Cloudinary configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v22+)
- MongoDB (local or Atlas)
- Cloudinary account
- MapTiler account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ashu-213/Mybnb.git
   cd Mybnb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAPTILER_KEY=your_maptiler_api_key
   ATLAS_DB=your_mongodb_connection_string
   SECRET=your_session_secret
   ```

4. **Seed the database** (Optional)
   ```bash
   node initialization/index.js
   ```

5. **Start the server**
   ```bash
   node app.js
   ```

6. **Open browser:** `http://localhost:3000/listings`

## 📝 API Endpoints

### Listings
- `GET /listings` - All listings (supports ?search=query)
- `GET /listings/new` - Create form (auth required)
- `POST /listings` - Create listing (auth required)
- `GET /listings/:id` - Single listing
- `GET /listings/:id/edit` - Edit form (owner only)
- `PUT /listings/:id` - Update listing (owner only)
- `DELETE /listings/:id` - Delete listing (owner only)

### Reviews
- `POST /listings/:id/reviews` - Add review (auth required)
- `DELETE /listings/:id/reviews/:reviewId` - Delete review (author only)

### Authentication
- `GET /signup` - Signup form
- `POST /signup` - Register user
- `GET /login` - Login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

## 🎨 Features in Detail

### Responsive Design
- Mobile-first approach with breakpoints at 576px, 768px, 992px, 1200px
- Collapsible navbar, responsive images, and flexible layouts
- Dedicated `forms.css` for modern authentication and listing forms

### Middleware Protection
- **isLoggedIn** - Authentication check
- **isOwner** - Listing ownership verification
- **isReviewAuthor** - Review ownership verification
- **joiValidateListing** - Server-side validation for listings
- **joiValidateReview** - Server-side validation for reviews

### Image Upload
- Multer handles file upload
- Cloudinary stores and optimizes images
- Thumbnail generation for edit forms

### Map Integration
- MapTiler Geocoding API converts locations to coordinates
- Mapbox GL JS displays interactive maps
- Markers placed at exact listing locations

## 🔮 Future Enhancements

- [ ] Make category filter buttons functional
- [ ] Add advanced search filters (price range, ratings)
- [ ] Booking system with calendar
- [ ] Payment integration (Stripe/PayPal)
- [ ] User profile pages
- [ ] Wishlist/favorites feature
- [ ] Email verification & password reset
- [ ] Pagination for listings
- [ ] Social authentication (Google, Facebook)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [ISC License](LICENSE).

## 👤 Author

**Ashu-213**
- GitHub: [@Ashu-213](https://github.com/Ashu-213)
- Repository: [Mybnb](https://github.com/Ashu-213/Mybnb)

## 🙏 Acknowledgments

- Inspired by [Airbnb](https://www.airbnb.com)
- Built as a learning project for full-stack web development
- Thanks to the open-source community for amazing tools and libraries

---

⭐ Star this repository if you found it helpful!
