# Task Management App

A simple web app to help keep track of everyday tasks, deadlines, and project categories. Built using HTML, CSS, and plain JavaScript.

## Features
- **Add Tasks:** Enter a task name, pick a category, set a deadline, and select a status.
- **Auto-Overdue Updates:** Automatically marks tasks as "Overdue" if the deadline passes before you finish them.
- **Filter Tasks:** Sort through tasks by status (e.g., In Progress, Completed) or category (Work, Personal, Study).
- **Saves Your Data:** Saves your task list in the browser's local storage so your items don't disappear when you refresh the page.

## File Breakdown
- `index.html` - Sets up the input form, filters, and list layout.
- `style.css` - Custom styles and color bars for task statuses.
- `app.js` - Handles adding tasks, updating statuses, filtering, and saving data.

---

## Reflection

### Challenges Faced
The main issue I ran into was getting an origin security error (`ERR_FILE_NOT_FOUND`) when opening the HTML file directly in my browser using a `file://` path. Another tricky part was making sure the task filter logic didn't accidentally hide new tasks right after adding them.

### How I Handled It
To fix the file path error, I checked the Chrome Developer Tools Console to pinpoint what was causing the issue. I moved my project into my main Documents folder, updated my editor settings, and tweaked the JavaScript code to make sure task filters were checked cleanly without blocking new inputs.

### What I'd Improve Next Time
If I had more time, I would like to add an edit button so users can change task details after adding them, put in a quick confirmation popup before deleting a task, and set up a local server environment to avoid local file security errors entirely.
