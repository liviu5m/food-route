# 🍔 [FoodRoute](https://food-route.vercel.app) - Modern Food Ordering Platform

<div align="center">
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java">
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white" alt="Stripe">
</div>

<div align="center">
  <p><strong>A full-stack food ordering platform with modern UI/UX, secure payments, and comprehensive admin management</strong></p>
  
  [![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
  [![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/yourusername/foodRoute/actions)
</div>

---

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Tech Stack](#-tech-stack)
- [📱 Screenshots](#-screenshots)
- [⚡ Quick Start](#-quick-start)
- [🐳 Docker Setup](#-docker-setup)
- [📚 API Documentation](#-api-documentation)
- [🔧 Configuration](#-configuration)
- [🛠️ Development](#️-development)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🌟 Features

### 👤 User Features
- **🔐 Authentication & Authorization**
  - Email/Password registration with verification
  - Google OAuth integration
  - JWT-based secure authentication
  - Role-based access control (User/Admin)

- **🛒 Shopping Experience**
  - Browse products by categories
  - Advanced filtering (price range, category, search)
  - Product reviews and ratings
  - Wishlist/Favorites functionality
  - Shopping cart management
  - Real-time cart updates

- **💳 Payment & Orders**
  - Stripe payment integration
  - Secure checkout process
  - Order history tracking
  - Order status updates
  - Email notifications

- **👥 User Management**
  - Profile management
  - Address management
  - Order history
  - Account verification

### ⚙️ Admin Features
- **📊 Dashboard**
  - Sales analytics
  - Order management
  - User statistics
  - Revenue tracking

- **📦 Product Management**
  - CRUD operations for products
  - Category management
  - Image upload (Cloudinary integration)
  - Inventory tracking

- **👥 User Management**
  - User role management
  - Account status control
  - User analytics

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     FoodRoute Architecture                  │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React + TypeScript)                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │   Pages     │ │ Components  │ │   Context   │          │
│  │             │ │             │ │             │          │
│  │ • Home      │ │ • Header    │ │ • AppContext│          │
│  │ • Products  │ │ • Cart      │ │ • Auth      │          │
│  │ • Cart      │ │ • Filters   │ │ • Cart      │          │
│  │ • Admin     │ │ • Sidebar   │ │             │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
├─────────────────────────────────────────────────────────────┤
│  Backend (Spring Boot + Java 17)                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │ Controllers │ │  Services   │ │ Repositories│          │
│  │             │ │             │ │             │          │
│  │ • Auth      │ │ • User      │ │ • JPA       │          │
│  │ • Product   │ │ • Product   │ │ • Custom    │          │
│  │ • Cart      │ │ • Order     │ │ • Queries   │          │
│  │ • Order     │ │ • Payment   │ │             │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
├─────────────────────────────────────────────────────────────┤
│  External Services                                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │ PostgreSQL  │ │  Cloudinary │ │   Stripe    │          │
│  │ (Supabase)  │ │   (Images)  │ │ (Payments)  │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Tech Stack

### Frontend
- **⚛️ React 19** - UI library
- **📘 TypeScript** - Type safety
- **🎨 Tailwind CSS** - Styling framework
- **🎯 Chakra UI** - Component library
- **🔄 TanStack Query** - Data fetching and caching
- **🗾 React Router** - Client-side routing
- **🎭 Framer Motion** - Animations
- **💳 Stripe React** - Payment processing
- **🔐 React OAuth Google** - Google authentication

### Backend
- **☕ Java 17** - Programming language
- **🌱 Spring Boot 3.5.3** - Application framework
- **🔒 Spring Security** - Authentication and authorization
- **📧 Spring Mail** - Email services
- **🗃️ Spring Data JPA** - Data persistence
- **🔑 JWT** - Token-based authentication
- **☁️ Cloudinary** - Image management
- **💰 Stripe Java** - Payment processing

### Database & Infrastructure
- **🐘 PostgreSQL** - Primary database (Supabase)
- **🐳 Docker** - Containerization
- **📧 Gmail SMTP** - Email delivery

## 📱 Screenshots

<div align="center">
  <h3>🏠 Home Page</h3>
  <p><em>Modern landing page with featured products and categories</em></p>
  
  <h3>🛒 Product Catalog</h3>
  <p><em>Advanced filtering, search, and sorting capabilities</em></p>
  
  <h3>🛒 Shopping Cart</h3>
  <p><em>Real-time cart updates and checkout process</em></p>
  
  <h3>⚙️ Admin Dashboard</h3>
  <p><em>Comprehensive admin panel for managing products and orders</em></p>
</div>

## ⚡ Quick Start

### Prerequisites
- **Java 17+** ☕
- **Node.js 18+** 🟢
- **Docker & Docker Compose** 🐳
- **PostgreSQL** 🐘 (or use Supabase)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/foodRoute.git
cd foodRoute
```

### 2. Environment Setup

#### Backend Configuration
Create `backend/src/main/resources/application.properties`:
```properties
# Database
spring.datasource.url=your_postgresql_url
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT
jwt.secret.key=your_jwt_secret

# Email
spring.mail.host=smtp.gmail.com
spring.mail.username=your_email
spring.mail.password=your_app_password

# Cloudinary
cloudinary.cloud.name=your_cloud_name
cloudinary.api.key=your_api_key
cloudinary.api.secret=your_api_secret

# Stripe
stripe.api.key=your_stripe_secret_key

# Google OAuth
google.client.id=your_google_client_id
google.client.secret=your_google_client_secret
```

#### Frontend Configuration
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:8080
```

### 3. Manual Setup

#### Backend
```bash
cd backend
./mvnw spring-boot:run
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🐳 Docker Setup

### Using Docker Compose (Recommended)
```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# Stop all services
docker-compose down
```

### Individual Services
```bash
# Backend only
docker build -t foodroute-backend ./backend
docker run -p 8080:8080 foodroute-backend

# Frontend only
docker build -t foodroute-frontend ./frontend
docker run -p 5137:5137 foodroute-frontend
```

## 📚 API Documentation

### 🔐 Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register new user |
| POST | `/auth/login` | User login |
| POST | `/auth/verify` | Verify email |
| POST | `/auth/resend` | Resend verification |

### 🛒 Product Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/product` | Get products (paginated) |
| GET | `/api/product/all` | Get all products |
| GET | `/api/product/{id}` | Get product by ID |
| POST | `/api/product` | Create product (Admin) |
| PUT | `/api/product/{id}` | Update product (Admin) |
| DELETE | `/api/product/{id}` | Delete product (Admin) |

### 🛒 Cart Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user cart |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart/{id}` | Update cart item |
| DELETE | `/api/cart/{id}` | Remove from cart |

### 📦 Order Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/order` | Get user orders |
| POST | `/api/order` | Create new order |
| GET | `/api/order/{id}` | Get order details |
| PUT | `/api/order/{id}` | Update order status (Admin) |

### 💳 Payment Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/checkout/create-payment-intent` | Create payment intent |
| POST | `/api/checkout/confirm-payment` | Confirm payment |

## 🔧 Configuration

### Required Environment Variables

#### Database
- `SPRING_DATASOURCE_URL` - PostgreSQL connection URL
- `SPRING_DATASOURCE_USERNAME` - Database username
- `SPRING_DATASOURCE_PASSWORD` - Database password

#### Security
- `JWT_SECRET_KEY` - JWT signing key (Base64 encoded)

#### Email Service
- `SUPPORT_EMAIL` - Support email address
- `APP_PASSWORD` - Gmail app password

#### External Services
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `CLOUD_NAME` - Cloudinary cloud name
- `CLOUD_API_KEY` - Cloudinary API key
- `CLOUD_API_SECRET` - Cloudinary API secret
- `STRIPE_API_KEY` - Stripe secret key

## 🛠️ Development

### Code Structure
```
foodRoute/
├── backend/
│   ├── src/main/java/com/foodroute/foodroute/
│   │   ├── controller/     # REST controllers
│   │   ├── service/        # Business logic
│   │   ├── repository/     # Data access layer
│   │   ├── model/         # JPA entities
│   │   ├── dto/           # Data transfer objects
│   │   ├── config/        # Configuration classes
│   │   └── responses/     # Response models
│   ├── Dockerfile
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── pages/     # Page components
│   │   │   ├── elements/  # Reusable UI elements
│   │   │   ├── layouts/   # Layout components
│   │   │   └── middleware/ # Route guards
│   │   ├── api/          # API service functions
│   │   └── App.tsx       # Main app component
│   ├── libs/             # Shared utilities
│   ├── Dockerfile
│   └── package.json
└── compose.yaml
```

### Development Workflow

1. **🔀 Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **💻 Develop & Test**
   ```bash
   # Backend tests
   cd backend && ./mvnw test
   
   # Frontend tests
   cd frontend && npm test
   ```

3. **🧹 Code Quality**
   ```bash
   # Frontend linting
   npm run lint
   
   # Format code
   npm run format
   ```

4. **🚀 Submit PR**
   - Ensure all tests pass
   - Update documentation if needed
   - Request code review

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### How to Contribute
1. 🍴 Fork the repository
2. 🔀 Create your feature branch
3. 💻 Make your changes
4. ✅ Add tests for new features
5. 📝 Update documentation
6. 🚀 Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p><strong>Made with ❤️ by the FoodRoute Team</strong></p>
  <p>🌟 Star this repository if you found it helpful!</p>
</div>
