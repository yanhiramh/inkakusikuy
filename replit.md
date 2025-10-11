# Inka Kusikuy E-commerce Platform

## Overview

Inka Kusikuy is a Python Flask-based e-commerce web application for a Peruvian eco-friendly snack company. The platform serves as both a corporate website and product showcase, featuring company information, interactive games, and a product catalog. The application is designed to promote healthy, sustainable snack products with a focus on environmental consciousness and Peruvian heritage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Backend Architecture
- **Framework**: Flask (Python) with modular structure
- **Database**: SQLAlchemy ORM with SQLite for development and PostgreSQL support for production
- **Application Structure**: Standard Flask pattern with separate modules for routes, models, and application initialization
- **Authentication**: Built-in password hashing using Werkzeug security utilities
- **Configuration**: Environment-based configuration with fallback defaults for development

### Frontend Architecture
- **Template Engine**: Jinja2 templating with template inheritance
- **CSS Framework**: Bootstrap 5 with custom CSS overrides
- **JavaScript**: Vanilla JavaScript with modular organization
- **Responsive Design**: Mobile-first approach using Bootstrap grid system
- **Theming**: Dark theme implementation with custom color variables

### Data Layer
- **Models**: Two primary entities - User and Product models
- **Database Schema**: Simple relational structure with basic user authentication and product catalog
- **Data Storage**: Hybrid approach using database for structured data and JSON files for product information
- **Connection Pooling**: Configured for production with connection recycling and pre-ping validation

### User Interface Components
- **Navigation**: Responsive navbar with mobile toggle functionality
- **Content Sections**: Hero sections, feature cards, and tabbed interfaces
- **Interactive Elements**: Memory games, quizzes, and tic-tac-toe implemented in JavaScript
- **Animation System**: Intersection Observer API for scroll-triggered animations
- **Error Handling**: Custom error pages for 404 and 500 errors

### Application Features
- **Multi-language Support**: Spanish content with international accessibility
- **Interactive Games**: Educational and entertainment features to engage users
- **Product Catalog**: Dynamic product loading with category filtering
- **Company Information**: About page with mission, vision, and company history
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## External Dependencies

### Core Framework Dependencies
- **Flask**: Web application framework
- **Flask-SQLAlchemy**: Database ORM integration
- **Werkzeug**: WSGI utilities and security functions

### Frontend Dependencies
- **Bootstrap 5**: CSS framework via CDN
- **Font Awesome 6**: Icon library via CDN
- **Custom Bootstrap Theme**: Dark theme variant for consistent styling

### Development Tools
- **Python Logging**: Built-in logging for debugging and monitoring
- **SQLite**: Development database (with PostgreSQL production support)
- **Static File Serving**: Flask's built-in static file handling

### Browser APIs
- **Intersection Observer**: For scroll-based animations
- **Fetch API**: For asynchronous product data loading
- **Local Storage**: Potential for game state persistence