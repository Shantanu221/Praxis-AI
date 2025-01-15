# Praxis: Your AI-Powered Development Companion

Welcome to **Praxis**, an innovative AI-powered platform designed to streamline your workflows and transform your productivity. Whether you're summarizing complex texts, analyzing code, or managing your tasks, Praxis offers a robust set of features to make your development journey smarter and more efficient.

---

## 🚀 Features

### **AI-Driven Summarization**

- Summarize large texts, codebases, or meeting transcripts with ease.
- Customizable summaries tailored to your preferences.
- Supports multiple formats including emails and documentation.

### **Real-Time Collaboration**

- Share and collaborate on projects effortlessly.
- Track progress with AI-driven insights.

### **Secure Payments**

- Integrated with Stripe for seamless and secure transactions.

---

## 🛠 Tech Stack

Praxis is built with cutting-edge technologies to ensure scalability, performance, and a seamless user experience:

### Frontend:

- **Next.js**: For server-side rendering and a highly performant frontend.
- **TypeScript**: Ensures type safety and reduces bugs.
- **Framer Motion**: Enables smooth animations and enhanced interactivity.
- **Tailwind CSS**: For rapid and responsive UI development.
- **ShadCN/UI**: Provides pre-built UI components and design consistency.

### Backend:

- **Gemini**: Powering AI-driven insights and summarization.
- **NeonDB**: A scalable and efficient database solution implementing postgreSQL..
- **Firebase**: For cloud storage and real-time data sync.
- **Prisma**: Simplifies database interactions with a type-safe ORM.
- **Clerk**: Handles authentication with a modern and user-friendly approach.

### AI & Integrations:

- **LangChain**: Enables advanced AI models for summarization and NLP tasks.
- **Stripe**: Manages payments and subscriptions securely.

### Validation:

- **Zod**: Provides schema-based validation for consistent and reliable data handling.

---

## 🌟 Getting Started

Follow these steps to set up Praxis locally:

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/praxis.git
   cd praxis
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   - Create a `.env.local` file in the root directory.
   - Add the required keys:
     ```env
     DATABASE_URL=""
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
     CLERK_SECRET_KEY=
     
     GEMINI_API_KEY=""
     ASSEMBLYAI_API_KEY=""
      
     STRIPE_SECRET_KEY=""
     STRIPE_PUBLISHABLE_KEY=""
     STRIPE_WEBHOOK_SECRET=""
     ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`.

---

## 📂 Project Structure (src)

```plaintext
.
├── components       # Reusable UI components along with custom components
├── app              # Next.js page protected routes
├── styles           # Tailwind and global CSS styles
├── assets           # required assets forthe project
├── hooks            # Reusable hooks for efficient codebase
├── sections         # Section for landing page sections
├── api              # API routes and integrations
├── lib              # Core library functions
├── server           # tRpc server code
└── .env             # Environment variables
```

---

## 🛡 Security

- Data is encrypted at rest and in transit.
- Role-based access control ensures sensitive data is protected.

---

## 🤝 Contribution

We welcome contributions to Praxis! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Create a pull request.

---

## 📧 Contact

For queries or feedback, reach out to me at [shantanu.ingale22@gmail.com](mailto\:shantanu.ingale22@gmail.com).

---

## 📜 License

Praxis is licensed under the [MIT License](LICENSE).

---

Start your AI-powered journey with **Praxis** today!

