#pragma glslify: pnoise3 = require(glsl-noise/simplex/3d) 

uniform sampler2D texture;
uniform vec4 resolution;
uniform vec2 mouse;
uniform float mousespeed;
uniform float progress;
uniform float time;

varying vec2 vUv;
varying float vCadre;
varying vec3 vPosition;

void main() {
  vec2 newUv = ((vUv - vec2(1.0))*resolution.zw +vec2(1.0));

  float newtime = time * 0.05;
  //Alpha channel
  float alpha = 1.-( (pnoise3(vPosition + newtime*0.2)*6.) * progress ) ;

  float mouseDist = length(vUv - mouse);
  float c = smoothstep(0.4, 0., mouseDist);

  float normSpeed = clamp(mousespeed, 0., 1.)*.1;
  
  float r = texture2D(texture, newUv + 0.5 * c*normSpeed).r;
  float g = texture2D(texture, newUv + 0.3 * c*normSpeed).g;
  float b = texture2D(texture, newUv + 0.1 * c*normSpeed).b;

  gl_FragColor = vec4(r, g, b,alpha);
}