import { useEffect, useRef } from "react";

const CanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const handleResize = () => {
      const c = canvasRef.current;
      if (!c) return;
      width = c.width = c.offsetWidth;
      height = c.height = c.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // 1. Generate Starfield particles (scattered)
    const particleCount = 80;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 4 + 2, // 2px to 6px
        opacity: Math.random() * 0.6 + 0.2, // 0.2 to 0.8
        tintType: Math.floor(Math.random() * 4), // 0: purple, 1: blue, 2: white, 3: gray/slate
        speedY: (Math.random() * 0.04 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseTime: Math.random() * Math.PI * 2
      });
    }

    // 2. Icosahedron 3D Geometry vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const vertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    // Auto-generate edges for distance = 2 (distSq = 4)
    const edges = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i][0] - vertices[j][0];
        const dy = vertices[i][1] - vertices[j][1];
        const dz = vertices[i][2] - vertices[j][2];
        const distSq = dx * dx + dy * dy + dz * dz;
        if (Math.abs(distSq - 4) < 0.1) {
          edges.push([i, j]);
        }
      }
    }

    let rx = 0;
    let ry = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");

      // Draw Starfield particles
      particles.forEach(p => {
        p.pulseTime += p.pulseSpeed;
        const currentOpacity = p.opacity * (0.55 + 0.45 * Math.sin(p.pulseTime));
        
        // Very slow floating
        p.y += p.speedY * 0.001;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        const px = p.x * width;
        const py = p.y * height;

        ctx.beginPath();
        let fillColor = "";
        
        if (isDark) {
          if (p.tintType === 0) fillColor = `rgba(168, 85, 247, ${currentOpacity})`; // purple
          else if (p.tintType === 1) fillColor = `rgba(59, 130, 246, ${currentOpacity})`; // blue
          else if (p.tintType === 2) fillColor = `rgba(255, 255, 255, ${currentOpacity})`; // white
          else fillColor = `rgba(148, 163, 184, ${currentOpacity})`; // slate-400
        } else {
          // Light mode: use slightly darker colors so they are visible
          if (p.tintType === 0) fillColor = `rgba(124, 58, 237, ${currentOpacity * 0.7})`; // purple-600
          else if (p.tintType === 1) fillColor = `rgba(37, 99, 235, ${currentOpacity * 0.7})`; // blue-650
          else if (p.tintType === 2) fillColor = `rgba(100, 116, 139, ${currentOpacity * 0.6})`; // slate-500
          else fillColor = `rgba(148, 163, 184, ${currentOpacity * 0.5})`; // slate-400
        }

        ctx.fillStyle = fillColor;

        // Draw square or circle particles
        if (p.tintType % 2 === 0) {
          ctx.fillRect(px - p.size / 2, py - p.size / 2, p.size, p.size);
        } else {
          ctx.arc(px, py, p.size / 2, 0, 2 * Math.PI);
          ctx.fill();
        }
      });

      // Slowly rotate 3D Polyhedron (approx. 20-30s per rotation)
      rx += 0.0012;
      ry += 0.0018;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      // Sphere positioning - responsive (right side on desktop, centered on mobile)
      const isDesktop = width > 1024;
      const cx = isDesktop ? width * 0.72 : width * 0.5;
      const cy = isDesktop ? height * 0.5 : height * 0.42;
      const scale = Math.min(width, height) * (isDesktop ? 0.38 : 0.3);

      const projected = vertices.map(([x, y, z]) => {
        // Rotate Y
        let x1 = x * cosY - z * sinY;
        let z1 = x * sinY + z * cosY;

        // Rotate X
        let y2 = y * cosX - z1 * sinX;
        let z2 = y * sinX + z1 * cosX;

        // Subtle perspective scaling
        const p = 3 / (3 + z2);

        return [
          cx + x1 * scale * p,
          cy + y2 * scale * p,
          z2
        ];
      });

      // Draw wireframe edges
      // Teal/green color, low opacity ~30-40%
      ctx.strokeStyle = isDark 
        ? "rgba(45, 212, 191, 0.28)" // teal-400
        : "rgba(13, 148, 136, 0.16)"; // teal-600 darker
      ctx.lineWidth = 1.2;

      edges.forEach(([u, v]) => {
        ctx.beginPath();
        ctx.moveTo(projected[u][0], projected[u][1]);
        ctx.lineTo(projected[v][0], projected[v][1]);
        ctx.stroke();
      });

      // Draw vertices
      projected.forEach(([x, y, z]) => {
        ctx.beginPath();
        const r = 2.5 * (2 / (2 + z * 0.4));
        ctx.arc(x, y, Math.max(1, r), 0, 2 * Math.PI);
        ctx.fillStyle = isDark ? "rgba(45, 212, 191, 0.65)" : "rgba(13, 148, 136, 0.4)";
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0" 
    />
  );
};

export default CanvasBackground;
