// Very simple client-side "auth" using localStorage for demo only.
const LS_KEYS = {
  auth: "hh_auth",
  messages: "hh_messages"
};

function getAuth(){
  try { return JSON.parse(localStorage.getItem(LS_KEYS.auth)) || null; } catch { return null; }
}
function setAuth(obj){
  localStorage.setItem(LS_KEYS.auth, JSON.stringify(obj));
}
function clearAuth(){ localStorage.removeItem(LS_KEYS.auth); }

function logout(){
  clearAuth();
  alert("Logged out");
  location.href = "index.html";
}

function login(username, password){
  // Demo users: admin / admin123, user / user123
  if(username === "admin" && password === "admin123"){
    setAuth({role:"admin", name:"Admin"});
    location.href = "admin.html";
    return true;
  }
  if(username === "user" && password === "user123"){
    setAuth({role:"user", name:"User"});
    location.href = "index.html";
    return true;
  }
  return false;
}

// Protect admin page
function requireAdmin(){
  const auth = getAuth();
  if(!auth || auth.role !== "admin"){
    alert("Admin access only");
    location.href = "login.html";
  }
}

// Utility: save contact messages (in localStorage)
function saveMessage(payload){
  const arr = JSON.parse(localStorage.getItem(LS_KEYS.messages) || "[]");
  arr.push({...payload, ts: Date.now()});
  localStorage.setItem(LS_KEYS.messages, JSON.stringify(arr));
}

function getMessages(){
  return JSON.parse(localStorage.getItem(LS_KEYS.messages) || "[]");
}

// Navbar: show login/logout buttons depending on state
function setupAuthUI(){
  const auth = getAuth();
  const loginLinks = document.querySelectorAll(".link-login");
  const logoutLinks = document.querySelectorAll(".link-logout");
  const adminLinks = document.querySelectorAll(".link-admin");
  const userBadge = document.querySelector(".user-badge");

  if(auth){
    logoutLinks.forEach(e=>e.classList.remove("hidden"));
    loginLinks.forEach(e=>e.classList.add("hidden"));
    if(auth.role === "admin"){ adminLinks.forEach(e=>e.classList.remove("hidden")); }
    if(userBadge){ userBadge.textContent = auth.name + " (" + auth.role + ")"; }
  }else{
    logoutLinks.forEach(e=>e.classList.add("hidden"));
    loginLinks.forEach(e=>e.classList.remove("hidden"));
    adminLinks.forEach(e=>e.classList.add("hidden"));
    if(userBadge){ userBadge.textContent = "Guest"; }
  }
}

// Mobile menu
function setupMenu(){
  const toggles = document.querySelectorAll(".menu-toggle");
  toggles.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const header = btn.closest(".header");
      const nav = header.querySelector(".nav");
      nav.classList.toggle("open");
    });
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  setupAuthUI();
  setupMenu();
});
