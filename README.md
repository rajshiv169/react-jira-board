# React Jira Board

A Jira-like task management board built with React and TypeScript. This project implements a drag-and-drop kanban board with local storage persistence. It's a client-side only application, perfect for personal task management without requiring any backend or authentication.

![React Jira Board](https://raw.githubusercontent.com/rajshiv169/react-jira-board/main/docs/screenshot.png)

## Features

- 📋 Drag and drop tasks between columns (Todo, In Progress, Done)
- ✏️ Edit task details (title, description, priority)
- 🎯 Priority-based task sorting within columns
- 🗑️ Delete tasks with a single click
- 🎨 Modern and clean UI inspired by Jira
- 🔄 Client-side storage using localStorage
- 🏷️ Task priority levels (Low, Medium, High)
- 📱 Responsive design for all devices
- ⚡ Fast and smooth animations
- 🔍 TypeScript for better code quality

## Demo

🔗 **Live Demo**: [React Jira Board](https://rajshiv169.github.io/react-jira-board/)

Try out the live demo to experience the following features:
- Create new tasks with different priority levels
- Edit existing tasks (title, description, priority)
- Drag and drop tasks between columns
- Sort tasks by priority within columns
- Delete tasks with a single click
- Local storage persistence (tasks are saved in your browser)
- Responsive design that works on both desktop and mobile

## Tech Stack

- React 18
- TypeScript
- React DnD for drag and drop functionality
- Local Storage for client-side data persistence
- CSS3 for styling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/rajshiv169/react-jira-board.git
\`\`\`

2. Navigate to the project directory:
\`\`\`bash
cd react-jira-board
\`\`\`

3. Install dependencies:
\`\`\`bash
npm install
\`\`\`

4. Start the development server:
\`\`\`bash
npm start
\`\`\`

The application will be available at \`http://localhost:3000\`

## Usage

### Adding Tasks

1. Click the "Add Task" button in the header
2. Fill in the task details:
   - Title (required)
   - Description (optional)
   - Priority (Low/Medium/High)
3. Click "Add Task" to create the task

### Managing Tasks

- **Move Tasks**: Drag and drop tasks between columns
- **Edit Tasks**: Click the edit button (✎) to modify task details
- **Delete Tasks**: Click the delete button (×) to remove a task
- **Priority Sorting**: Tasks are automatically sorted by priority within each column
- **Priority Levels**: Tasks are color-coded by priority:
  - 🔴 High: Red
  - 🟡 Medium: Yellow
  - 🟢 Low: Green

### Data Persistence

This is a client-side only application. All data is stored locally in your browser's localStorage. This means:
- Your tasks are private and only accessible on your current browser
- Data persists across page refreshes and browser restarts
- Tasks are not shared between different browsers or devices
- Clearing browser data will remove all tasks

## Project Structure

\`\`\`
react-jira-board/
├── src/
│   ├── components/
│   │   ├── AddTaskForm.tsx
│   │   ├── AddTaskForm.css
│   │   ├── EditTaskForm.tsx
│   │   ├── Board.tsx
│   │   ├── Board.css
│   │   ├── Column.tsx
│   │   ├── Column.css
│   │   ├── TaskCard.tsx
│   │   └── TaskCard.css
│   ├── types.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── public/
├── package.json
├── tsconfig.json
└── README.md
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## Future Enhancements

- [x] Task editing functionality
- [x] Priority-based sorting
- [ ] Multiple boards support
- [ ] Backend integration with user authentication
- [ ] Task filtering and search
- [ ] Task labels and categories
- [ ] Due dates and reminders
- [ ] Collaborative features (requires backend implementation)
- [ ] Data export/import functionality
- [ ] Cross-device synchronization

## Current Limitations

- Client-side only: all data is stored in browser's localStorage
- No user authentication or multi-user support
- Data is limited to a single device/browser
- No data backup or synchronization features
- Storage capacity limited by browser's localStorage limits

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Atlassian's Jira
- Built with React and TypeScript
- Uses React DnD for drag and drop functionality