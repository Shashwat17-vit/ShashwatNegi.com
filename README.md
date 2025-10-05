# Shashwat Negi - Portfolio Website

Personal portfolio website showcasing projects, experience, and skills in Data Science, Machine Learning, and Cloud Computing.

## 🚀 Quick Start

### Run Locally with Docker

```bash
# Build and run
docker-compose up -d

# View at http://localhost:8080

# Stop
docker-compose down
```

### Run Without Docker

Just open `index.html` in a browser, or use a simple HTTP server:

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server -p 8000
```

## 📁 Project Structure

```
.
├── index.html              # Main portfolio page
├── assets/
│   ├── css/               # Styles
│   ├── js/                # JavaScript (including contact form)
│   ├── img/               # Images and photos
│   └── vendor/            # Third-party libraries
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose setup
└── nginx.conf             # Nginx web server config
```

## ✨ Features

- **Responsive Design** - Works on all devices
- **Contact Form** - EmailJS integration (no backend needed)
- **Project Portfolio** - Showcase of work and projects
- **Certifications** - AWS and professional recommendations
- **Fast Loading** - Optimized assets and caching

## 🐳 Docker Deployment

See [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**
```bash
# Build image
docker build -t shashwat-portfolio .

# Run container
docker run -d -p 8080:80 shashwat-portfolio
```

## 🌐 Contact Form

The contact form uses **EmailJS** for sending emails directly from the browser:
- No backend server required
- Configured in `assets/js/contact-form-simple.js`
- Sends to: negi3@wisc.edu

## 🛠️ Technologies

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Framework:** Bootstrap 5
- **Libraries:** AOS (animations), Typed.js, Swiper
- **Email:** EmailJS
- **Deployment:** Docker + Nginx

## 📧 Contact

- **Email:** negi3@wisc.edu
- **LinkedIn:** [Shashwat Negi](https://www.linkedin.com/in/shashwat-negi-b57a8115b/)
- **GitHub:** [Shashwat17-vit](https://github.com/Shashwat17-vit)

## 📄 License

Personal portfolio website © 2024 Shashwat Negi
