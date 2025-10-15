# 🎉 Event-Ease

Event-Ease is a full-stack web application that makes event management simple and user-friendly.  
It allows users to create events, book seats, and manage their bookings, while admins can manage events and attendees.

---

## Live 
[EventEase](https://event-ease-khaki.vercel.app)


---

## ✨ Features

- 🔐 **Authentication**
  - User signup & login with JWT authentication
  - Role-based access (user/admin)

- 📅 **Event Management**
  - Create new events with details (title, description, location, date, seats)
  - View upcoming, ongoing, and past events
  - Delete events (admin only)

- 🎟 **Seat Booking**
  - Book available seats for events
  - Live seat count updates
  - "My Bookings" page to view all events booked by a user

- 👥 **Attendee Management**
  - Admin can view attendees (id, name, email, seats booked)
  - Remove attendees from an event

- 🔔 **User Experience**
  - Toast notifications for success/error feedback
  - Grid-based layout for attendees list
  - Protected routes for authenticated users

---

## 🛠 Tech Stack

- **Frontend:** React, Tailwind CSS, React-Toastify, Context API  
- **Backend:** Node.js, Express.js, JWT Authentication  
- **Database:** PostgreSQL  
- **Other Tools:** Axios, pg (PostgreSQL client)  



---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/coderPriyanshu007/Event-Ease.git
cd Event-Ease

```

### 2. Change directory to backend and install depenedencies, then run server.
```bash
cd backend
npm install
npm run server

```

### 3. Change directory to frontend , install dependencies and run dev. 
```bash
cd frontend
npm install
npm run dev

```

---

## Postman Documentation

### 1. Link to Postman docmentation
- [Postman Documentation](https://documenter.getpostman.com/view/48936818/2sB3QFSCgk)


### 2. Or just import postman json file in the postman directory in the repo

