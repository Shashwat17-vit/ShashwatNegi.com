# GitHub Actions Docker Setup Guide

## 🐛 What Was Wrong

The original workflow had this error:
```yaml
tags: ${{secrets.DOCKER_HUB_USERNAME}}/website:$(date-Y-%m-%d%H-%M)
```

**Problem:** `$(date ...)` is shell syntax, but it was being used as a literal string in YAML, causing:
```
ERROR: invalid tag "***/website:$(date-Y-%m-%d%H-%M)": invalid reference format
```

## ✅ What I Fixed

### 1. **Proper Timestamp Generation**
```yaml
- name: Generate timestamp tag
  id: timestamp
  run: echo "TAG=$(date +'%Y-%m-%d-%H-%M-%S')" >> $GITHUB_OUTPUT
```
- Runs the date command in a shell step
- Stores output in GitHub Actions variable
- Uses proper date format syntax

### 2. **Use GitHub Actions Variables**
```yaml
tags: |
  ${{ secrets.DOCKER_HUB_USERNAME }}/shashwat-portfolio:latest
  ${{ secrets.DOCKER_HUB_USERNAME }}/shashwat-portfolio:${{ steps.timestamp.outputs.TAG }}
```
- References the timestamp from previous step
- Creates two tags: `latest` and timestamped version

### 3. **Removed Duplicate Build Step**
- Original had separate "build" and "push" steps
- Now combined into one efficient step

### 4. **Added Docker Buildx**
- Enables advanced Docker features
- Better caching and multi-platform builds

### 5. **Added Build Caching**
```yaml
cache-from: type=registry,ref=${{ secrets.DOCKER_HUB_USERNAME }}/shashwat-portfolio:latest
cache-to: type=inline
```
- Speeds up subsequent builds
- Reuses layers from previous builds

## 🔧 How to Set Up GitHub Secrets

### Step 1: Create Docker Hub Account
1. Go to [hub.docker.com](https://hub.docker.com)
2. Sign up or log in
3. Note your username (e.g., `shashwatnegi`)

### Step 2: Generate Docker Hub Access Token
1. Go to Docker Hub → Account Settings → Security
2. Click **New Access Token**
3. Name it: `github-actions`
4. Permissions: **Read, Write, Delete**
5. Click **Generate**
6. **Copy the token** (you won't see it again!)

### Step 3: Add Secrets to GitHub Repository
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

**Add Secret 1:**
- Name: `DOCKER_HUB_USERNAME`
- Value: Your Docker Hub username (e.g., `shashwatnegi`)
- Click **Add secret**

**Add Secret 2:**
- Name: `DOCKER_HUB_TOKEN`
- Value: The access token you copied from Docker Hub
- Click **Add secret**

## 🚀 How It Works Now

### Workflow Trigger
The workflow runs automatically when:
- You push to the `main` branch
- You manually trigger it from GitHub Actions tab

### Build Process
```
1. Checkout code from repository
   ↓
2. Set up Docker Buildx (advanced builder)
   ↓
3. Login to Docker Hub (using secrets)
   ↓
4. Generate timestamp (e.g., 2024-10-05-14-30-45)
   ↓
5. Build Docker image from Dockerfile
   ↓
6. Tag image with:
   - latest
   - timestamp (e.g., 2024-10-05-14-30-45)
   ↓
7. Push both tags to Docker Hub
   ↓
8. Done! ✅
```

### Result
Your Docker image will be available at:
- `yourusername/shashwat-portfolio:latest` (always the newest)
- `yourusername/shashwat-portfolio:2024-10-05-14-30-45` (specific version)

## 📦 Using Your Docker Image

### Pull Latest Version
```bash
docker pull yourusername/shashwat-portfolio:latest
```

### Pull Specific Version
```bash
docker pull yourusername/shashwat-portfolio:2024-10-05-14-30-45
```

### Run Container
```bash
docker run -d -p 8080:80 yourusername/shashwat-portfolio:latest
```

## 🔍 Monitoring the Workflow

### View Workflow Runs
1. Go to your GitHub repository
2. Click **Actions** tab
3. See all workflow runs and their status

### View Build Logs
1. Click on any workflow run
2. Click on the job name (`build-and-push`)
3. Expand each step to see logs

### Common Status Icons
- ✅ Green checkmark = Success
- ❌ Red X = Failed
- 🟡 Yellow circle = In progress
- ⚪ Gray circle = Queued

## 🐛 Troubleshooting

### Error: "Invalid credentials"
**Solution:** Check your Docker Hub secrets
1. Verify `DOCKER_HUB_USERNAME` is correct
2. Regenerate `DOCKER_HUB_TOKEN` if needed
3. Update secret in GitHub

### Error: "Repository does not exist"
**Solution:** Image name must match Docker Hub repo
- Either create repo on Docker Hub first
- Or Docker Hub will auto-create on first push

### Error: "Denied: requested access to the resource is denied"
**Solution:** Token permissions
1. Generate new token with **Read, Write, Delete** permissions
2. Update `DOCKER_HUB_TOKEN` secret

### Build is Slow
**Solution:** Caching is working after first build
- First build: ~2-5 minutes
- Subsequent builds: ~30-60 seconds (with cache)

## 📊 Workflow File Breakdown

```yaml
# When to run
on:
  push:
    branches: ["main"]    # On push to main branch
  workflow_dispatch:       # Manual trigger

# What to do
jobs:
  build-and-push:
    runs-on: ubuntu-latest  # Use Ubuntu runner
    
    steps:
      # 1. Get code
      - uses: actions/checkout@v4
      
      # 2. Set up Docker
      - uses: docker/setup-buildx-action@v3
      
      # 3. Login to Docker Hub
      - uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_HUB_USERNAME }}
          password: ${{ secrets.DOCKER_HUB_TOKEN }}
      
      # 4. Generate timestamp
      - run: echo "TAG=$(date +'%Y-%m-%d-%H-%M-%S')" >> $GITHUB_OUTPUT
      
      # 5. Build and push
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: |
            username/shashwat-portfolio:latest
            username/shashwat-portfolio:2024-10-05-14-30-45
```

## 🎯 Best Practices

### 1. **Use Semantic Versioning (Optional)**
Instead of timestamps, you can use version tags:
```yaml
tags: |
  ${{ secrets.DOCKER_HUB_USERNAME }}/shashwat-portfolio:latest
  ${{ secrets.DOCKER_HUB_USERNAME }}/shashwat-portfolio:v1.0.0
```

### 2. **Add Git SHA Tag**
Track which commit built the image:
```yaml
- name: Get short SHA
  id: sha
  run: echo "SHA=$(git rev-parse --short HEAD)" >> $GITHUB_OUTPUT

tags: |
  username/shashwat-portfolio:latest
  username/shashwat-portfolio:${{ steps.sha.outputs.SHA }}
```

### 3. **Multi-Platform Builds**
Build for both AMD64 and ARM64:
```yaml
- name: Build and push
  uses: docker/build-push-action@v5
  with:
    platforms: linux/amd64,linux/arm64
    push: true
    tags: ...
```

### 4. **Add Build Notifications**
Get notified on Slack/Discord when builds complete

## 🔐 Security Notes

### ✅ Good Practices
- Use Docker Hub access tokens (not password)
- Store credentials in GitHub Secrets
- Use read-only tokens when possible
- Rotate tokens periodically

### ❌ Never Do This
- Hardcode credentials in workflow file
- Commit `.env` files with secrets
- Share access tokens publicly
- Use personal password instead of token

## 📈 Advanced: Deploy After Build

You can extend the workflow to deploy after building:

```yaml
- name: Deploy to Cloud Run
  run: |
    gcloud run deploy shashwat-portfolio \
      --image ${{ secrets.DOCKER_HUB_USERNAME }}/shashwat-portfolio:latest \
      --platform managed \
      --region us-central1 \
      --allow-unauthenticated
```

## 🎓 Summary

### What Changed
- ❌ Old: `$(date-Y-%m-%d%H-%M)` (invalid syntax)
- ✅ New: Proper shell step → GitHub Actions variable

### What You Need
1. Docker Hub account
2. Docker Hub access token
3. Two GitHub secrets configured

### What Happens
1. Push to main branch
2. GitHub Actions builds Docker image
3. Image pushed to Docker Hub with two tags
4. Anyone can pull and run your image

---

**Your workflow is now fixed and ready to use! 🎉**

Push to main branch to trigger the first build.
