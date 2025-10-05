# Docker Deployment Guide

## 📦 What I Created

I've created a complete Docker setup to containerize and deploy your portfolio website:

1. **`Dockerfile`** - Builds a Docker image with Nginx serving your static website
2. **`nginx.conf`** - Custom Nginx configuration with optimization and security
3. **`.dockerignore`** - Excludes unnecessary files from Docker image
4. **`docker-compose.yml`** - Easy orchestration for running the container

## 🏗️ How the Dockerfile Works

### Step-by-Step Explanation:

```dockerfile
# 1. Base Image
FROM nginx:alpine
```
- Uses **Nginx Alpine** (only ~23 MB!)
- Alpine Linux is lightweight and secure
- Nginx is a high-performance web server

```dockerfile
# 2. Clean Default Files
RUN rm -rf /usr/share/nginx/html/*
```
- Removes default Nginx welcome page

```dockerfile
# 3. Copy Your Website
COPY index.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
# ... etc
```
- Copies all your HTML, CSS, JS, and images into the container

```dockerfile
# 4. Custom Configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
```
- Applies custom Nginx settings (gzip, caching, security headers)

```dockerfile
# 5. Expose Port
EXPOSE 80
```
- Makes port 80 available for HTTP traffic

```dockerfile
# 6. Start Server
CMD ["nginx", "-g", "daemon off;"]
```
- Starts Nginx in foreground mode (required for Docker)

## 🚀 How to Build & Run

### Option 1: Using Docker Commands

#### Build the Image:
```bash
docker build -t shashwat-portfolio .
```

#### Run the Container:
```bash
docker run -d -p 8080:80 --name my-portfolio shashwat-portfolio
```

#### View Your Site:
Open browser: `http://localhost:8080`

#### Stop Container:
```bash
docker stop my-portfolio
```

#### Remove Container:
```bash
docker rm my-portfolio
```

### Option 2: Using Docker Compose (Easier!)

#### Start:
```bash
docker-compose up -d
```

#### View Your Site:
Open browser: `http://localhost:8080`

#### Stop:
```bash
docker-compose down
```

#### View Logs:
```bash
docker-compose logs -f
```

## 📊 Docker Image Details

**Base Image:** `nginx:alpine`
- Size: ~23 MB (base) + ~5 MB (your website) = **~28 MB total**
- OS: Alpine Linux (minimal, secure)
- Web Server: Nginx (fast, reliable)

**Your Website Files:**
- HTML pages
- CSS styles
- JavaScript (including EmailJS contact form)
- Images and assets
- Vendor libraries (Bootstrap, AOS, etc.)

## 🌐 Deployment Options

### 1. **AWS ECS (Elastic Container Service)**
```bash
# Push to Amazon ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker tag shashwat-portfolio:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/shashwat-portfolio:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/shashwat-portfolio:latest

# Deploy to ECS Fargate (serverless containers)
```

### 2. **Google Cloud Run**
```bash
# Build and push
gcloud builds submit --tag gcr.io/PROJECT-ID/shashwat-portfolio

# Deploy
gcloud run deploy shashwat-portfolio \
  --image gcr.io/PROJECT-ID/shashwat-portfolio \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### 3. **Azure Container Instances**
```bash
# Build and push to Azure Container Registry
az acr build --registry myregistry --image shashwat-portfolio:latest .

# Deploy
az container create \
  --resource-group myResourceGroup \
  --name shashwat-portfolio \
  --image myregistry.azurecr.io/shashwat-portfolio:latest \
  --dns-name-label shashwat-portfolio \
  --ports 80
```

### 4. **Docker Hub (Public Registry)**
```bash
# Login to Docker Hub
docker login

# Tag image
docker tag shashwat-portfolio:latest yourusername/shashwat-portfolio:latest

# Push to Docker Hub
docker push yourusername/shashwat-portfolio:latest

# Anyone can now pull and run:
docker pull yourusername/shashwat-portfolio:latest
docker run -d -p 8080:80 yourusername/shashwat-portfolio:latest
```

### 5. **Heroku Container Registry**
```bash
# Login to Heroku
heroku container:login

# Build and push
heroku container:push web -a your-app-name

# Release
heroku container:release web -a your-app-name
```

### 6. **DigitalOcean App Platform**
```bash
# Push to Docker Hub first, then:
# - Go to DigitalOcean App Platform
# - Create new app from Docker Hub image
# - Deploy automatically
```

### 7. **Kubernetes (Any Cloud)**
```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: shashwat-portfolio
spec:
  replicas: 3
  selector:
    matchLabels:
      app: portfolio
  template:
    metadata:
      labels:
        app: portfolio
    spec:
      containers:
      - name: portfolio
        image: shashwat-portfolio:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: portfolio-service
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 80
  selector:
    app: portfolio
```

```bash
kubectl apply -f deployment.yaml
```

## 🔧 Nginx Configuration Highlights

The `nginx.conf` includes:

### Performance:
- **Gzip compression** - Reduces file sizes by 70-80%
- **Static asset caching** - 1-year cache for images/CSS/JS
- **Efficient file serving** - Nginx is optimized for static content

### Security:
- **X-Frame-Options** - Prevents clickjacking
- **X-Content-Type-Options** - Prevents MIME sniffing
- **X-XSS-Protection** - Enables browser XSS filter
- **Hidden files blocked** - Prevents access to .git, .env, etc.

### SEO & UX:
- **Custom error pages** - 404 redirects to index.html
- **Proper MIME types** - Correct content types for all files

## 📈 Scaling Options

### Horizontal Scaling (Multiple Containers):
```bash
docker-compose up -d --scale portfolio-website=3
```

### Load Balancer:
Add Nginx or HAProxy in front of multiple containers

### CDN Integration:
- CloudFlare - Free tier available
- AWS CloudFront - Pay as you go
- Google Cloud CDN - Integrated with GCP

## 🔍 Monitoring & Logs

### View Container Logs:
```bash
docker logs -f shashwat-portfolio
```

### Check Container Status:
```bash
docker ps
```

### Inspect Container:
```bash
docker inspect shashwat-portfolio
```

### Container Stats:
```bash
docker stats shashwat-portfolio
```

## 🛡️ Security Best Practices

1. **Run as non-root user** (already done in nginx:alpine)
2. **Scan for vulnerabilities:**
   ```bash
   docker scan shashwat-portfolio
   ```
3. **Keep base image updated:**
   ```bash
   docker pull nginx:alpine
   docker build -t shashwat-portfolio .
   ```
4. **Use HTTPS in production** (add SSL certificates)
5. **Set resource limits:**
   ```yaml
   # In docker-compose.yml
   deploy:
     resources:
       limits:
         cpus: '0.5'
         memory: 256M
   ```

## 💰 Cost Comparison

### Cloud Run (Google):
- **Free tier:** 2 million requests/month
- **Cost:** $0.00002400 per request after free tier
- **Your site:** Likely stays in free tier

### AWS ECS Fargate:
- **Cost:** ~$15-30/month for 1 container (0.25 vCPU, 0.5 GB)
- **Free tier:** 750 hours/month for first year

### DigitalOcean:
- **App Platform:** $5/month (basic)
- **Droplet + Docker:** $6/month (1 GB RAM)

### Heroku:
- **Free tier:** Available (sleeps after 30 min inactivity)
- **Hobby:** $7/month (always on)

## 🎯 Recommended Deployment

For your portfolio website, I recommend:

1. **Development/Testing:** Docker locally (`docker-compose up`)
2. **Production:** 
   - **Best:** Google Cloud Run (free tier, auto-scaling)
   - **Alternative:** AWS ECS Fargate (if already using AWS)
   - **Budget:** DigitalOcean App Platform ($5/month)

## 📝 Quick Commands Reference

```bash
# Build
docker build -t shashwat-portfolio .

# Run locally
docker run -d -p 8080:80 --name portfolio shashwat-portfolio

# Or use docker-compose
docker-compose up -d

# View site
# Open http://localhost:8080

# Stop
docker-compose down

# Rebuild after changes
docker-compose up -d --build

# View logs
docker-compose logs -f

# Clean up everything
docker-compose down -v
docker rmi shashwat-portfolio
```

## 🚀 Next Steps

1. **Test locally:**
   ```bash
   docker-compose up -d
   ```
   Visit `http://localhost:8080`

2. **Choose deployment platform** (Google Cloud Run recommended)

3. **Push to registry** (Docker Hub or cloud provider)

4. **Deploy to production**

5. **Set up custom domain** (optional)

6. **Enable HTTPS** (Let's Encrypt or cloud provider SSL)

---

**Your website is now containerized and ready to deploy anywhere! 🎉**
