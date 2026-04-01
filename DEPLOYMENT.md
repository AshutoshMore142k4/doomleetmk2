# 🚀 Comprehensive Digital Ocean Deployment Guide

Since we just separated the codebase into a clean `frontend` and `backend` monorepo, the deployment steps on your DigitalOcean droplet have slightly changed. Follow these exact steps to get your blazing-fast Redis backend and optimized React frontend live on the internet!

---

## Step 1: SSH into your Droplet

Open your terminal and securely connect to your droplet:
```bash
ssh root@<your-droplet-ip>
```

---

## Step 2: Pull the Latest Monorepo Changes

Navigate into your repository directory and pull the massive architectural update we just pushed.

> [!CAUTION]
> Using `reset --hard` ensures any old file remnants are totally wiped and it perfectly matches the new segregated structure. Commit or stash any manual server changes first!

```bash
cd doomleetmk2
git fetch origin
git reset --hard origin/main
```

---

## Step 3: Global Installations
Make sure you have `pm2` installed globally to keep the backend running forever:
```bash
npm install -g pm2
```

---

## Step 4: Setup the Backend (Express + Redis)

We need to install dependencies, set up the secret `.env` file (since it wasn't pushed to GitHub), and start the server instances.

1. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Create the Environment File (`.env`):**
   ```bash
   nano .env
   ```
   *Paste your Upstash Redis credentials inside:*
   ```ini
   UPSTASH_REDIS_REST_URL="https://regular-tahr-75232.upstash.io"
   UPSTASH_REDIS_REST_TOKEN="gQAAAAAAASXgAAIncDJkZTllMmM1YTQzYjc0NzAzYTg5Yzg5YzgxNDYwNGZjZXAyNzUyMzI"
   PORT=3001
   ```
   *Save and exit (`Ctrl+X`, then `Y`, then `Enter`).*

3. **Start the Backend API Cluster with PM2:**
   Since we added `ecosystem.config.js`, this will auto-start 3 load-balanced instances!
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   ```

---

## Step 5: Build the Frontend (React / Vite)

Your frontend must be compiled into static static HTML/JS/CSS files so Nginx can host it natively (which is incredibly fast).

1. **Navigate to frontend and install dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

2. **Create the Frontend Environment File:**
   ```bash
   nano .env
   ```
   *Paste your React (`VITE_`) variables in here:*
   ```ini
   VITE_BACKEND_URL="https://yourdomain.com" # VERY IMPORTANT: Point to your public domain
   VITE_CLERK_PUBLISHABLE_KEY="..."
   # (Add your other Clerk/Supabase keys here)
   ```
   *Save and exit.*

3. **Build the production bundle:**
   ```bash
   npm run build
   ```
   *This creates a `dist/` folder full of highly optimized chunks!*

---

## Step 6: Configure Nginx (The Load Balancer & Web Server)

Nginx will do two things: Serve the Frontend `dist/` folder to the user, and proxy `/api/*` requests to your backend Express cluster!

1. **Edit your Nginx config:**
   ```bash
   nano /etc/nginx/sites-available/default
   ```

2. **Replace the file contents with this configuration:**
   *(Ensure you replace `yourdomain.com` with your actual domain or IP!)*

   ```nginx
   # Define the backend cluster
   upstream backend_cluster {
       least_conn;               # Send request to instance with fewest active connections
       server 127.0.0.1:3001;
       server 127.0.0.1:3002;
       server 127.0.0.1:3003;
   }

   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com; # Add your domain or IP here

       # 1. Serve the React Frontend
       root /root/doomleetmk2/frontend/dist; 
       index index.html;

       location / {
           try_files $uri $uri/ /index.html; # History mode routing
       }

       # 2. Proxy API requests to the Backend Cluster
       location /api/ {
           proxy_pass http://backend_cluster;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           
           # Get real client IP for your Express Rate Limiter
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
   }
   ```
   *Save and exit (`Ctrl+X`, then `Y`, then `Enter`).*

3. **Verify and Restart Nginx:**
   ```bash
   nginx -t
   systemctl restart nginx
   ```

---

## Step 7: Final Polish (SSL / HTTPS)

If you have a domain pointing to the droplet, run Certbot to automatically secure the site with SSL:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 🎉 You are Done!
Your site is now running a multi-instance Redis backend environment completely decoupled from a static cached React frontend. Extreme performance unlocked!
