# React Jira Board

A Jira-like task management board built with React and TypeScript. This project implements a drag-and-drop kanban board with local storage persistence.

![React Jira Board](https://raw.githubusercontent.com/rajshiv169/react-jira-board/main/docs/screenshot.png)

## Features

- 📋 Drag and drop tasks between columns (Todo, In Progress, Done)
- 🎨 Modern and clean UI inspired by Jira
- 🔄 Persistent storage using localStorage
- 🏷️ Task priority levels (Low, Medium, High)
- 📱 Responsive design for all devices
- ⚡ Fast and smooth animations
- 🔍 TypeScript for better code quality

## Tech Stack

- React 18
- TypeScript
- react-beautiful-dnd for drag and drop
- Local Storage for data persistence
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
- **View Details**: Click on a task to view its full details
- **Priority Levels**: Tasks are color-coded by priority:
  - 🔴 High: Red
  - 🟡 Medium: Yellow
  - 🟢 Low: Green

### Data Persistence

All changes are automatically saved to your browser's local storage. Your tasks will persist even after refreshing the page or closing the browser.

## Project Structure

\`\`\`
react-jira-board/
├── src/
│   ├── components/
│   │   ├── AddTaskForm.tsx
│   │   ├── AddTaskForm.css
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

- [ ] Task editing functionality
- [ ] Multiple boards support
- [ ] User authentication
- [ ] Task filtering and search
- [ ] Task labels and categories
- [ ] Due dates and reminders
- [ ] Collaborative features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Atlassian's Jira
- Built with React and TypeScript
- Uses react-beautiful-dnd for drag and drop functionality