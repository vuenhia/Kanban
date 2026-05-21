KanBan Board - Task Management App

Features


Task Management
- Add new tasks
- Edit tasks (double‑click or press Enter to save)
- Delete tasks
- Drag & drop tasks between columns
- Smooth, intuitive interactions

  
Workflow Columns
- To Do
- In Progress
- Review
- Done

  
Saving Data
- Automatically saves all tasks to localStorage
- Restores tasks instantly on refresh
- No save button needed


What I Learned


State Management
- Managing nested state objects for multiple columns
- Updating state immutably during drag‑and‑drop
- Using lazy initialization in useState to prevent overwriting saved data
- Syncing state with localStorage using useEffect

  
Drag & Drop Logic
- Passing task + column metadata through components
- Handling drag start, drag end, and drop events
- Preventing unwanted re-renders
- Ensuring tasks move cleanly between columns

  
Layout & Responsive Design
- Solving flexbox wrapping issues
- Using min-width: 0 and flex: 1 for proper text wrapping
- Structuring task cards with text + actions
- Creating stable, predictable column layouts

  
Debugging
- Fixing state overwrite issues on initial render
- Solving text overflow in flex containers
- Handling Enter key behavior in textareas and inputs
- Ensuring edit mode and drag mode don’t conflict


Future Improvements
- Reordering tasks within the same column
- Column color themes
- Task priority levels
- Animations on drag hover
- Add subtasks or descriptions
- Add a backend for multi-user boards

  

Why I Built This

I wanted to build a Kanban Board to create a workflow for future projects that I want to build. I also built this as a challenge to broaden my understanding of React
