
const typingText = document.getElementById("typing-text");

const roles = [
  "Full Stack Developer",
  "Software Developer"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  typingText.textContent = currentRole.substring(0, charIndex);

  if (!deleting) {
    charIndex++;

    if (charIndex > currentRole.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    charIndex--;

    if (charIndex < 0) {
      charIndex = 0;
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? 45 : 90);
}

typeEffect();

// Reveal sections as they enter the viewport
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});
// Horizontal project carousel
const projectsTrack = document.getElementById("projects-track");
const projectPrev = document.getElementById("project-prev");
const projectNext = document.getElementById("project-next");

if (projectsTrack && projectPrev && projectNext) {
  function scrollProjects(direction) {
    const card = projectsTrack.querySelector(".project-card");

    if (!card) return;

    const styles = window.getComputedStyle(projectsTrack);
    const gap = parseFloat(styles.columnGap) || 0;
    const distance = card.getBoundingClientRect().width + gap;

    projectsTrack.scrollBy({
      left: direction * distance,
      behavior: "smooth"
    });
  }

  projectPrev.addEventListener("click", () => {
    scrollProjects(-1);
  });

  projectNext.addEventListener("click", () => {
    scrollProjects(1);
  });
}/* =====================================
   INTERACTIVE 3D TECH STACK SPHERE
===================================== */

const techSphere = document.getElementById("tech-sphere");
const sphereContainer = document.getElementById("tech-sphere-container");

if (techSphere && sphereContainer) {

  const technologies = [
    "🐍 Python",
    "⚙️ Django",
    "⚛️ React",
    "🌐 HTML",
    "🎨 CSS",
    "⚡ JavaScript",
    "🗄️ MySQL",
    "🔗 REST API",
    "🤖 Generative AI",
    "✨ Git & GitHub",
    "💻 Full Stack",
  
  ];

  const radius = 145;
  const total = technologies.length;

  // Create technology labels around the sphere
  technologies.forEach((technology, index) => {

    const y = 1 - (index / (total - 1)) * 2;
    const horizontalRadius = Math.sqrt(1 - y * y);
    const angle = Math.PI * (3 - Math.sqrt(5)) * index;

    const x = Math.cos(angle) * horizontalRadius;
    const z = Math.sin(angle) * horizontalRadius;

    const item = document.createElement("div");

    item.className = "tech-item";
    item.textContent = technology;

    item.style.transform = `
      translate3d(
        ${x * radius}px,
        ${-y * radius}px,
        ${z * radius}px
      )
      translate(-50%, -50%)
    `;

    techSphere.appendChild(item);
  });

  // Sphere rotation values
  let rotationX = -12;
  let rotationY = 0;

  // Rotation speed after dragging
  let velocityX = 0;
  let velocityY = 0;

  let isDragging = false;
  let previousX = 0;
  let previousY = 0;

  // Update sphere appearance
  function updateSphere() {
    techSphere.style.transform =
      `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  }

  updateSphere();

  // Start dragging
  sphereContainer.addEventListener("pointerdown", (event) => {

    isDragging = true;

    previousX = event.clientX;
    previousY = event.clientY;

    velocityX = 0;
    velocityY = 0;

    sphereContainer.classList.add("dragging");
    sphereContainer.setPointerCapture(event.pointerId);

  });

  // Rotate sphere while dragging
  sphereContainer.addEventListener("pointermove", (event) => {

    if (!isDragging) return;

    const deltaX = event.clientX - previousX;
    const deltaY = event.clientY - previousY;

    rotationY += deltaX * 0.6;
    rotationX -= deltaY * 0.6;

    // Keep vertical rotation within a comfortable range
    rotationX = Math.max(-85, Math.min(85, rotationX));

    velocityY = deltaX * 0.12;
    velocityX = -deltaY * 0.12;

    previousX = event.clientX;
    previousY = event.clientY;

    updateSphere();

  });

  // Stop dragging
  function stopDragging() {
    isDragging = false;
    sphereContainer.classList.remove("dragging");
  }

  sphereContainer.addEventListener("pointerup", stopDragging);
  sphereContainer.addEventListener("pointercancel", stopDragging);
  sphereContainer.addEventListener("lostpointercapture", stopDragging);

  // Gentle rotation continues after releasing the sphere
  function animateSphere() {

    if (!isDragging) {

      rotationY += velocityY;
      rotationX += velocityX;

      // Gradually slow down the rotation
      velocityX *= 0.96;
      velocityY *= 0.96;

      // Gentle automatic movement when almost stopped
      if (Math.abs(velocityX) < 0.01) {
        velocityX = 0;
      }

      if (Math.abs(velocityY) < 0.01) {
        velocityY = 0.15;
      }

      rotationX = Math.max(-85, Math.min(85, rotationX));

      updateSphere();
    }

    requestAnimationFrame(animateSphere);
  }

  animateSphere();
}
