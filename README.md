# Royacare Agency Dashboard

A comprehensive employee management system built with Next.js, Firebase, and MongoDB.

## Features

- Employee Management
- Document Upload and Management
- Reference Submissions
- Admin Dashboard
- Authentication System
- Progressive Web App (PWA) Support
- Responsive Design

## Tech Stack

- **Frontend**: Next.js 14+, React 19+, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: Firebase/Clerk
- **Storage**: Firebase Storage, Google Drive
- **Form Handling**: React Hook Form, Zod
- **UI Components**: HeadlessUI, DaisyUI
- **State Management**: React Context
- **Performance**: Next.js Image Optimization, Compression

## Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB Database
- Firebase Project
- Google Cloud Project (for Drive integration)

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/royacare-agency.git
   cd royacare-agency
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`

5. Run the development server:
   ```bash
   yarn dev
   ```

## Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub

2. Connect your GitHub repository to Vercel

3. Configure environment variables in Vercel dashboard

4. Deploy with the following build settings:
   - Framework Preset: Next.js
   - Build Command: `yarn build`
   - Output Directory: `.next`
   - Install Command: `yarn install`

### Manual Deployment

1. Build the application:
   ```bash
   yarn build
   ```

   ..

2. Start the production server:
   ```bash
   yarn start
   ```

## Environment Variables

Configure the following environment variables:

```env
# See .env.example for all required variables
```

## Security Considerations

1. Never commit `.env` files to version control
2. Regularly rotate API keys and secrets
3. Use environment variables for all sensitive data
4. Implement proper authentication checks
5. Follow security best practices for file uploads

## Performance Optimization

The project includes several performance optimizations:

- Image optimization with Next.js Image
- Code splitting and lazy loading
- Gzip compression
- PWA capabilities
- Caching strategies
- Module optimization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@royacare-agency.com or create an issue in the repository.