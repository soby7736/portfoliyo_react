import { useEffect, useRef } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Hero.css";

function Hero() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const drawOcean = (t) => {
      const { width: W, height: H } = canvas;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      ctx.clearRect(0, 0, W, H);

      /* Sky */
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.55);
      sky.addColorStop(0, `hsl(${215 + mx * 15}, 55%, ${72 + my * 10}%)`);
      sky.addColorStop(0.6, `hsl(${205 + mx * 10}, 50%, ${82 + my * 8}%)`);
      sky.addColorStop(1, `hsl(${195 + mx * 8}, 45%, 90%)`);
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H * 0.55);

      /* Sun glow */
      const sunX = W * (0.25 + mx * 0.5);
      const sunY = H * (0.06 + my * 0.2);
      const sunGlow = ctx.createRadialGradient(
        sunX,
        sunY,
        0,
        sunX,
        sunY,
        W * 0.3,
      );
      sunGlow.addColorStop(0, "rgba(255,245,210,0.85)");
      sunGlow.addColorStop(0.25, "rgba(255,220,120,0.3)");
      sunGlow.addColorStop(0.7, "rgba(255,200,80,0.08)");
      sunGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = sunGlow;
      ctx.fillRect(0, 0, W, H * 0.58);

      ctx.beginPath();
      ctx.arc(sunX, sunY, 22 + mx * 8, 0, Math.PI * 2);
      const sunDisk = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 26);
      sunDisk.addColorStop(0, "rgba(255,255,240,1)");
      sunDisk.addColorStop(1, "rgba(255,220,100,0.85)");
      ctx.fillStyle = sunDisk;
      ctx.fill();

      /* Horizon haze */
      const haze = ctx.createLinearGradient(0, H * 0.46, 0, H * 0.58);
      haze.addColorStop(0, "rgba(220,238,255,0.55)");
      haze.addColorStop(1, "rgba(160,210,240,0)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, H * 0.46, W, H * 0.12);

      /* Ocean layers */
      const layers = [
        { y: 0.52, amp: 5, speed: 0.28, r: 160, g: 210, b: 235 },
        { y: 0.57, amp: 8, speed: 0.45, r: 130, g: 195, b: 230 },
        { y: 0.63, amp: 11, speed: 0.62, r: 100, g: 180, b: 225 },
        { y: 0.69, amp: 14, speed: 0.8, r: 75, g: 165, b: 215 },
        { y: 0.76, amp: 17, speed: 1.0, r: 55, g: 155, b: 210 },
        { y: 0.84, amp: 20, speed: 1.2, r: 40, g: 145, b: 205 },
        { y: 0.92, amp: 24, speed: 1.45, r: 30, g: 135, b: 198 },
        { y: 1.0, amp: 0, speed: 0, r: 25, g: 130, b: 195 },
      ];

      for (let i = 0; i < layers.length - 1; i++) {
        const l = layers[i];
        const next = layers[i + 1];
        const baseY = H * l.y;
        const nextBaseY = H * next.y;
        const offsetX = (mx - 0.5) * 70 * (i + 1) * 0.13;
        const offsetY = (my - 0.5) * 25 * (i + 1) * 0.09;
        const amp = l.amp * (1 + my * 0.4);
        const steps = 80;

        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const x = (s / steps) * W;
          const w1 =
            Math.sin((x / W) * Math.PI * 4 + t * l.speed + offsetX * 0.04) *
            amp;
          const w2 =
            Math.sin(
              (x / W) * Math.PI * 6 - t * l.speed * 0.7 + offsetX * 0.02,
            ) *
            amp *
            0.35;
          const y = baseY + w1 + w2 + offsetY;
          s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.lineTo(W, nextBaseY);
        ctx.lineTo(0, nextBaseY);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseY - amp, 0, nextBaseY);
        grad.addColorStop(0, `rgba(${l.r},${l.g},${l.b},0.92)`);
        grad.addColorStop(1, `rgba(${next.r},${next.g},${next.b},1)`);
        ctx.fillStyle = grad;
        ctx.fill();

        if (i >= 3) {
          ctx.beginPath();
          for (let s = 0; s <= steps; s++) {
            const x = (s / steps) * W;
            const w1 =
              Math.sin((x / W) * Math.PI * 4 + t * l.speed + offsetX * 0.04) *
              amp;
            const w2 =
              Math.sin(
                (x / W) * Math.PI * 6 - t * l.speed * 0.7 + offsetX * 0.02,
              ) *
              amp *
              0.35;
            const y = baseY + w1 + w2 + offsetY - 1.5;
            s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(255,255,255,${0.12 + i * 0.04})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      ctx.fillStyle = `rgb(25,130,195)`;
      ctx.fillRect(0, H * 0.97, W, H * 0.03);

      /* Sun reflection */
      const reflW = 70 + mx * 55;
      const reflGrad = ctx.createLinearGradient(0, H * 0.52, 0, H);
      reflGrad.addColorStop(0, `rgba(255,235,130,${0.18 + mx * 0.1})`);
      reflGrad.addColorStop(0.4, "rgba(255,220,80,0.08)");
      reflGrad.addColorStop(1, "rgba(255,220,80,0)");
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(sunX - reflW * 0.25, H * 0.52);
      ctx.lineTo(sunX - reflW * 1.8, H);
      ctx.lineTo(sunX + reflW * 1.8, H);
      ctx.lineTo(sunX + reflW * 0.25, H * 0.52);
      ctx.closePath();
      ctx.clip();
      ctx.fillStyle = reflGrad;
      ctx.fillRect(0, H * 0.52, W, H * 0.5);
      ctx.restore();

      /* Vignette */
      const vig = ctx.createRadialGradient(
        W / 2,
        H / 2,
        H * 0.25,
        W / 2,
        H / 2,
        H * 0.9,
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(10,30,60,0.14)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);
    };

    const animate = () => {
      timeRef.current += 0.016;
      drawOcean(timeRef.current);
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="hero-section" id="home">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-overlay">
        <div className="hero-card">
          <div className="row align-items-center g-5">
            {/* Avatar */}
            <div className="col-md-5 text-center">
              <div className="hero-avatar-wrap">
                <div className="hero-avatar-ring" />
                <img
                  src="/images/profile_Pic1.jpg"
                  alt="Soby Francis"
                  className="hero-avatar"
                />
              </div>
            </div>

            {/* Text */}
            <div className="col-md-7 text-center text-md-start">
              <p className="hero-greeting">Hello, I'm</p>
              <h1 className="hero-name">Soby Francis</h1>
              <h4 className="hero-role">Python Full Stack Developer</h4>

              <div className="hero-buttons">
                <a href="/files/Soby_Francis_Python_Developer.pdf" download>
                  <button className="btn-hero-outline">Download CV</button>
                </a>
                <a href="#contact">
                  <button className="btn-hero-fill">Contact Info</button>
                </a>
                
              </div>

              <div className="hero-socials">
                <a
                  href="https://www.linkedin.com/in/sobyfrancis/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-link"
                  aria-label="LinkedIn"
                >
                  <i className="bi bi-linkedin" />
                </a>
                <a
                  href="https://github.com/soby7736"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-link"
                  aria-label="GitHub"
                >
                  <i className="bi bi-github" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
