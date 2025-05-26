# 📁 Secure File Upload & Metadata Processing Microservice

A secure Node.js backend microservice that handles file uploads with metadata, authenticates users using JWT, processes files asynchronously in the background, and tracks status updates.

---

## 🧰 Tech Stack

- **Node.js** 18+
- **Express.js**
- **PostgreSQL** (via Sequelize ORM)
- **JWT Authentication**
- **Multer** (for file uploads)
- **Local Queue (Custom)**
- **bcrypt** (password hashing)
- **Redis** (required by BullMQ)
- **dotenv** (environment variable management)

---

## 🚀 Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/secure-file-upload.git
cd secure-file-upload
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=db_url
```

---

## ▶️ Running the Server

Create a user:

```bash
node src/createUser.js
```

Start the server with:

```bash
node server.js
```

The server will start on the port specified in the `PORT` environment variable (default is 3000).

---

## 🔐 Authentication

- **Login Endpoint:** `POST /auth/login`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt_token_here"
  }
  ```
- Use the returned JWT token in the `Authorization` header as `Bearer <token>` for protected endpoints.

---

## 📤 File Upload

- **Endpoint:** `POST /upload`
- **Headers:** `Authorization: Bearer <token>`
- **Form Data:**
  - `file`: The file to upload (max size 5MB)
  - `title`: Title of the file
  - `description`: Description of the file
- **Response:**
  ```json
  {
    "fileId": "file_record_id",
    "status": "uploaded"
  }
  ```
- Files are stored in the `uploads/` directory.
- Metadata including title, description, original filename, and storage path are saved in the database.
- Uploaded files are processed asynchronously in the background via a local queue.

---

## 📂 File Retrieval

- **Endpoint:** `GET /files/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "id": "file_id",
    "original_filename": "original_file_name.ext",
    "title": "File Title",
    "description": "File description",
    "status": "processing|completed|failed",
    "extracted_data": "any extracted metadata or processing results",
    "uploaded_at": "timestamp"
  }
  ```
- Only the user who uploaded the file can access its metadata.

---

## ⚙️ Background Processing

- File processing jobs are handled asynchronously using a custom local queue.
- The queue processes tasks such as metadata extraction or other file-related jobs in the background to improve performance and responsiveness.

---

## 🗄️ Database

- Uses PostgreSQL as the database.
- Sequelize ORM manages models and database interactions.
- User authentication and file metadata are stored in the database.

---

## 📄 License & Author

- License: ISC
- Author: Palak Agrawal
