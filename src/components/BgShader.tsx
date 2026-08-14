import React, { useEffect, useRef } from 'react';

export const BgShader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL not supported, falling back to CSS background');
      return;
    }

    // Vertex shader source
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader source: Renders moving organic green auroral waves
    const fsSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 v_uv;

      // Simple 2D pseudo-noise
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        
        // Scale and animate coordinates
        vec2 uv1 = uv * 3.5;
        uv1.x += u_time * 0.08;
        uv1.y += sin(u_time * 0.05 + uv1.x) * 0.3;

        vec2 uv2 = uv * 2.0;
        uv2.x -= u_time * 0.04;
        uv2.y += cos(u_time * 0.07) * 0.4;

        float n1 = noise(uv1);
        float n2 = noise(uv2);
        
        float finalNoise = (n1 + n2) * 0.5;

        // Custom light off-white and soft sage colors
        vec3 creamBg   = vec3(0.968, 0.976, 0.961); // #f7f9f5
        vec3 softSage  = vec3(0.910, 0.933, 0.898); // #e8ece5
        vec3 sageGlow  = vec3(0.105, 0.262, 0.196); // #1b4332 emerald glow

        // Base gradient
        vec3 base = mix(creamBg, softSage, uv.y);

        // Add soft moving aurora bands
        float wave = sin(uv.x * 2.5 + u_time * 0.15) * 0.5 + 0.5;
        float band = 1.0 - abs(uv.y - (0.4 + wave * 0.25));
        band = pow(band, 8.0) * 0.04;

        // Combine noise and bands
        vec3 glow = sageGlow * (finalNoise * 0.03 + band);
        
        // Final pixel color blend
        vec3 color = base + glow;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compile shader helper
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    // Link program
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Setup coordinates buffer (full screen quad)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');

    let animationFrameId: number;
    let startTime = Date.now();

    const resize = () => {
      // Set render resolution smaller than display size to optimize WebGL performance
      const dpr = 0.5; // Optimized to reduce rendering load
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    // Render loop
    const render = () => {
      const elapsed = (Date.now() - startTime) / 1000.0;
      
      gl.uniform1f(timeLoc, elapsed);
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Parallax scrolling translation effect
    const handleScroll = () => {
      const scrolled = window.scrollY;
      canvas.style.transform = `translate3d(0, ${scrolled * 0.12}px, 0)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '120%', // Make it slightly taller for the parallax scroll buffer
          willChange: 'transform',
        }}
      />
      {/* Repeating Diagonal Hash Pattern overlay on top of shader just like CoinCompass */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(27, 67, 50, 0.03) 0px, rgba(27, 67, 50, 0.03) 1px, transparent 1px, transparent 10px)',
          backgroundSize: '14px 14px',
          opacity: 0.85,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
