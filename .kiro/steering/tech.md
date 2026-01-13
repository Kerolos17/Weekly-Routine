---
inclusion: always
---

# Technology Stack

## Frontend Technologies

- **React.js**: Component-based UI library for building interactive interfaces
- **HTML5**: Semantic markup with RTL (right-to-left) support for Arabic
- **JavaScript (ES6+)**: Modern JavaScript features with React hooks
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **Local Storage API**: Client-side data persistence

## Build System

This is a **React application** built with Create React App.

### Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Testing

- Manual testing in browser
- Test across different screen sizes (responsive design)
- Verify RTL layout works correctly
- Test localStorage functionality
- React component testing with Jest (included in Create React App)

## Code Style Guidelines

### React/JavaScript

- Use functional components with React hooks
- Use modern ES6+ features (const/let, arrow functions, template literals)
- Prefer functional programming patterns where appropriate
- Keep components small and focused
- Use descriptive variable and component names
- Comment complex logic, especially Arabic text handling
- Follow React best practices (proper key props, avoid inline functions in JSX)

### Component Structure

- One component per file
- Use PascalCase for component names
- Keep components pure when possible
- Use custom hooks for shared logic
- Separate business logic from presentation logic

### HTML

- Use semantic HTML elements
- Include proper `lang="ar"` and `dir="rtl"` attributes
- Ensure accessibility with proper ARIA labels
- Keep structure clean and readable

### CSS (Tailwind)

- Use Tailwind utility classes consistently
- Prefer responsive design patterns (`md:`, `lg:` prefixes)
- Maintain consistent spacing and color schemes
- Use semantic color names in Tailwind palette

## Browser Support

- Modern browsers with ES6+ support
- Local Storage API support required
- RTL text rendering support
