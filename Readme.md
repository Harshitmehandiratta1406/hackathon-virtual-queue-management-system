# Virtual Queue Management System (VQMS)

## 🚀 Project Title: Virtual Queue Management System (VQMS)

### 📌 Problem Statement
Waiting in long queues is a frustrating and time-consuming experience. Businesses and organizations need an efficient queue management system to reduce waiting times and enhance customer experience. The Virtual Queue Management System (VQMS) aims to streamline the queueing process by allowing users to join a queue virtually and get real-time updates on their position and estimated wait time.

---

## 🛠 Solution Overview
The VQMS is a web-based application that enables users to join a virtual queue, track their position, and receive notifications when their turn is approaching. It leverages:
- **Frontend:** React.js (for an interactive UI)
- **Backend:** Node.js, Express.js
- **Database:** MySQL (for storing queue data)
- **Email Notifications:** Nodemailer (for notifying users when their turn is near)
- **Real-time Updates:** WebSockets (for dynamic queue position updates)

---

## 📥 Setup & Installation

### **Prerequisites**
Ensure you have the following installed on your system:
- **Node.js** (v16 or later)
- **MySQL Server**
- **Git**

### **1️⃣ Clone the Repository**
```sh
 git clone https://github.com/your-repo/vqms.git
 cd vqms
```

### **2️⃣ Setup Backend**
```sh
cd backend
npm install
```

Create a `.env` file inside `backend/` and add the following variables:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=vqms_db
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
```

Start the backend server:
```sh
npm start
```

### **3️⃣ Setup Frontend**
```sh
cd ../frontend  
npm install

```
I take frontend name as vqms..

Start the frontend server:
```sh
npm start
```

The application should now be running at `http://localhost:3000/`.

---

## 🎮 Usage Instructions

### **User Flow**
1. **Join the Queue:** Users enter their details and join the virtual queue.
2. **View Queue Status:** Users see their position, estimated wait time, and real-time updates.
3. **Notifications:** When only 5 people are ahead, an email notification is sent.
4. **Check-in:** Users are called to the service desk when it’s their turn.

---

## 📡 API Documentation

### **1️⃣ Join Queue**
**Endpoint:** `POST /api/join`
**Description:** Adds a new user to the queue.
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com"
}
```
**Response:**
```json
{
  "message": "Successfully joined the queue",
  "queuePosition": 5,
  "estimatedTime": "15 minutes"
}
```

### **2️⃣ Get Queue Status**
**Endpoint:** `GET /api/queue-status`
**Description:** Fetches the current queue details.
**Response:**
```json
{
  "currentPosition": 5,
  "estimatedWaitTime": "15 minutes",
  "totalPeopleInQueue": 20
}
```

### **3️⃣ Send Notification**
**Endpoint:** `POST /api/notify`
**Description:** Sends an email notification when a user’s turn is near.

---



## 💡 Future Enhancements
- **SMS Notifications** for users who prefer text alerts.
- **Mobile App Integration** for a more seamless experience.
- **AI-powered Predictions** to improve wait-time estimates.

---

## 🤝 Contributing
We welcome contributions! Feel free to open an issue or submit a pull request.

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

