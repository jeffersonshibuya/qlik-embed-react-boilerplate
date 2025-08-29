# Qlik Embed React Boilerplate

A modern React application that integrates Qlik Sense analytics through the Qlik Embed API, providing a comprehensive dashboard and data visualization platform with Qlik Embed.

## 🚀 Features

### 🔐 Authentication & Authorization
- **OAuth Integration**: Secure authentication with Qlik Sense using OAuth 2.0
- **User Management**: User information display and session management
- **Protected Routes**: Authentication-based route protection

### 📊 Qlik Analytics Integration
- **Embedded Charts**: Display Qlik Sense charts and visualizations directly in the application
- **KPI Components**: Real-time key performance indicators
- **Interactive Tables**: Data tables with sorting, filtering, and pagination
- **Sheet Management**: Browse and interact with Qlik Sense sheets
- **Theme Support**: Multiple visual themes (Classic, Breeze) for embedded content

### 📈 Dashboard & Data Management
- **Multi-App Support**: List and manage multiple Qlik applications
- **Data Tables**: Advanced data table with:
  - Column sorting and filtering
  - Faceted filters
  - Date range filters
  - Pagination controls
  - Export capabilities
- **Real-time Data**: Live data updates from Qlik Sense

### ✅ Task Management System
- **CRUD Operations**: Create, read, update, and delete tasks
- **Task Status Tracking**: Mark tasks as complete/incomplete
- **Form Integration**: User-friendly task creation forms
- **Database Persistence**: PostgreSQL database with Drizzle ORM

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-friendly interface
- **Sidebar Navigation**: Collapsible sidebar with organized navigation
- **Modal System**: Context-aware modal dialogs
- **Loading States**: Smooth loading indicators and skeletons
- **Toast Notifications**: User feedback with Sonner toast system

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icons

### Data & State Management
- **TanStack Query**: Server state management
- **Zustand**: Client state management
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation

### Database & ORM
- **PostgreSQL**: Primary database
- **Drizzle ORM**: Type-safe database operations
- **Drizzle Kit**: Database migrations and schema management

### Qlik Integration
- **@qlik/embed-react**: Official Qlik Embed React components
- **@qlik/api**: Qlik Sense API client

### Development Tools
- **ESLint**: Code linting
- **TypeScript**: Static type checking
- **Drizzle Studio**: Database management interface

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Main application routes
│   │   ├── charts/        # Qlik charts and visualizations
│   │   ├── list-apps/     # Qlik applications listing
│   │   ├── qlik-data/     # Data table views
│   │   ├── sheet/         # Qlik sheet management
│   │   └── tasks/         # Task management system
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── data-table/        # Advanced data table components
│   └── ui/                # Base UI components
├── features/              # Feature-based organization
│   ├── app-layout/        # Application layout components
│   ├── auth/              # Authentication features
│   ├── charts/            # Chart and visualization features
│   ├── tasks/             # Task management features
│   └── qlik-data/         # Data handling features
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries and configurations
├── db/                    # Database schema and configuration
└── providers/             # React context providers
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Qlik Sense environment with OAuth configuration

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd qlik-embed-react-boilerplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/database"
   
   # Qlik Configuration
   QLIK_CLIENT_ID="your-qlik-client-id"
   QLIK_CLIENT_SECRET="your-qlik-client-secret"
   QLIK_HOST="your-qlik-host"
   ```

4. **Database Setup**
   ```bash
   # Generate migrations
   npm run db:generate
   
   # Run migrations
   npm run db:migrate
   
   # (Optional) Open Drizzle Studio
   npm run db:studio
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📖 Usage

### Authentication
1. Navigate to the login page
2. Authenticate with your Qlik Sense credentials
3. The application will redirect to the dashboard upon successful authentication

### Dashboard Navigation
- **Dashboard**: Main overview page
- **Charts**: View embedded Qlik charts and KPIs
- **Sheet**: Browse and interact with Qlik Sense sheets
- **Qlik Data**: Advanced data table with filtering and sorting
- **List Apps**: Browse available Qlik applications
- **Tasks**: Manage application tasks

### Working with Qlik Data
1. **View Charts**: Navigate to the Charts page to see embedded visualizations
2. **Interact with Sheets**: Use the Sheet page to browse and select different Qlik sheets
3. **Explore Data**: Use the Qlik Data page for detailed data exploration with advanced filtering
4. **Switch Applications**: Use the List Apps page to switch between different Qlik applications

### Task Management
1. **Create Tasks**: Use the task form to create new tasks
2. **View Tasks**: See all tasks in the tasks table
3. **Update Status**: Mark tasks as complete or incomplete
4. **Delete Tasks**: Remove tasks from the system

## 🔧 Configuration

### Qlik Embed Configuration
The application uses a configuration file at `lib/qlik-embed-config.json`:
```json
{
  "appId": "your-default-app-id",
  "context": { 
    "interactions": { 
      "select": false 
    } 
  }
}
```

### Database Configuration
Database schema is defined in `db/schema.ts` and can be extended for additional features.

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio

### Code Organization
The application follows a feature-based architecture:
- Each feature is self-contained in the `features/` directory
- Components are organized by functionality
- Shared utilities and configurations are in `lib/`
- Database operations are centralized in `db/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the code comments
- Open an issue on GitHub

---

**Note**: This application requires a valid Qlik Sense environment with proper OAuth configuration to function correctly.
