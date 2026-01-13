---
inclusion: always
---

# Project Structure

## File Organization

```
/
├── .kiro/                     # Kiro configuration and steering files
│   └── steering/             # AI assistant guidance documents
├── public/
│   └── index.html           # HTML template with RTL support
├── src/
│   ├── components/          # React components
│   │   ├── Header.js       # Weekly focus, progress, export/import
│   │   ├── ProgressBar.js  # Progress visualization
│   │   ├── ExportImport.js # Data backup/restore controls
│   │   ├── HabitSection.js # Individual habit tracking sections
│   │   ├── TaskManager.js  # Additional task management
│   │   ├── WeeklyReview.js # Reflection textareas
│   │   └── WeeklyRating.js # Week evaluation system
│   ├── data/
│   │   └── defaultSections.js # Habit categories configuration
│   ├── hooks/
│   │   └── useLocalStorage.js # Custom hook for persistence
│   ├── utils/
│   │   ├── exportImport.js    # JSON export/import utilities
│   │   └── progressCalculator.js # Progress calculation logic
│   ├── App.js              # Main application component
│   ├── index.js           # React app entry point
│   └── index.css          # Tailwind CSS imports
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
└── postcss.config.js      # PostCSS configuration
```

## Architecture Patterns

### React Single Page Application (SPA)

- Component-based architecture with React functional components
- React hooks for state management and side effects
- No routing - single view with multiple component sections
- Responsive design with Tailwind CSS

### State Management

- **React State**: `useState` hook for local component state
- **Custom Hook**: `useLocalStorage` for persistent state management
- **Local Storage Persistence**: Automatic save/load on state changes
- **Reactive Updates**: React's built-in reactivity system

### Component Structure

#### Main Components

- **App.js**: Root component managing global state and data flow
- **Header**: Weekly focus input, progress bar, export/import controls
- **HabitSection**: Individual habit tracking sections (rendered from array)
- **TaskManager**: Additional work items with CRUD operations
- **WeeklyReview**: Reflection textareas for continuous improvement
- **WeeklyRating**: Simple radio button week evaluation

#### Data Flow

1. **Load**: Initialize from localStorage via custom hook
2. **Update**: User interactions trigger React state updates
3. **Save**: Automatic persistence through useLocalStorage hook
4. **Render**: React's reactivity handles DOM updates

## Code Organization

### React Component Structure

- **App Component**: Main state management, data flow coordination
- **Custom Hooks**: Reusable logic (localStorage integration)
- **Utility Functions**: Pure functions for calculations and data processing
- **Data Layer**: Configuration objects and constants
- **Component Layer**: UI components with props-based communication

### Naming Conventions

- **Components**: PascalCase (e.g., `HabitSection`, `TaskManager`)
- **Functions**: camelCase (e.g., `toggleCheck`, `updateReview`)
- **Variables**: camelCase for JavaScript, kebab-case for CSS classes
- **Constants**: UPPER_SNAKE_CASE for configuration data
- **Files**: PascalCase for components, camelCase for utilities
- **Arabic Text**: Keep original Arabic in strings, use descriptive English variable names

### File Responsibilities

- **App.js**: Main component, state management, event handlers
- **Components/**: Individual UI components with specific responsibilities
- **Hooks/**: Custom React hooks for shared logic
- **Utils/**: Pure utility functions
- **Data/**: Configuration and constant data

## Extensibility Guidelines

### Adding New Habit Sections

1. Add new object to `DEFAULT_SECTIONS` array in `src/data/defaultSections.js`
2. Follow existing structure: `title`, `items`, optional `notes`
3. Rendering will be automatic through `HabitSection` component

### Adding New Features

- Create new components in `src/components/` directory
- Use React hooks for state management
- Maintain localStorage compatibility through `useLocalStorage` hook
- Follow existing naming conventions and component patterns
- Keep components focused and reusable
- Add utility functions to `src/utils/` for shared logic

### Adding New State

- Update the `INITIAL_STATE` object in `App.js`
- Ensure new state properties are handled in localStorage
- Create appropriate handler functions in the main App component
- Pass state and handlers down through props
